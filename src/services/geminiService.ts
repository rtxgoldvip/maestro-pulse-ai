import { GoogleGenerativeAI, GenerationConfig, SafetySetting, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Filters } from "@/types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in your environment variables. Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig: GenerationConfig = {
  temperature: 0.2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings: SafetySetting[] = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

interface ChatContext {
  filters: Filters;
  visible_tabs: string[];
  data_samples: {
    gestor_fin: any[];
    contas_a_pagar: any[];
    contas_a_receber: any[];
  };
}

const getSystemInstruction = (userPrompt: string, context: ChatContext) => {
  const contextString = JSON.stringify(context, null, 2);
  return `Você é o 'Sistema de Ressonância', a IA por trás do 'Maestro Farol'. Sua base de conhecimento foi atualizada até 29 de Outubro de 2025.
ESCOPO ESTRITO: Sua única função é analisar pedidos do utilizador sobre os dados de negócio (contexto: ${contextString}) OU controlar a UI do dashboard (abas visíveis: ${context.visible_tabs}). O contexto inclui os KPIs financeiros: valorPago, valorAPagar, valorRecebido, valorAReceber, atrasoPagar, atrasoReceber, fluxoCaixaMes.
DIRETRIZ DE RECUSA: Para QUALQUER pergunta fora deste escopo (política, religião, etc.), responda APENAS com a frase: 'Minha especialidade são os dados e funcionalidades deste sistema. Não tenho informações sobre outros tópicos.'.
TAREFA: Analise o pedido: "${userPrompt}". Determine a intent e entities.
* Intents Válidas: query_data (storytelling), visualize_data (gráficos), adicionar_agenda_simulado, control_ui.
* LÓGICA CONVERSACIONAL (CLARIFICAÇÃO):
1. Se o pedido for ambíguo (ex: 'faturamento'), responda APENAS com o texto: 'Entendido. Você se refere ao Faturamento Bruto (Receita) ou Líquido (Lucro)?'
2. Se o pedido não tiver filtros de tempo (mês/ano), responda APENAS com o texto: 'Claro. Para qual mês e ano você gostaria de ver essa informação?'
* OUTPUT (JSON/TEXTO):
* intent: query_data (Storytelling): Responda com TEXTO SIMPLES contando a história dos dados (ex: "O lucro de Maio foi R$ X...").
* intent: visualize_data: Responda APENAS com JSON no formato {{"intent": "visualize_data", "entities": {{...}}, "analysis_text": "Aqui está o gráfico..."}}. As "entities" devem conter o tipo de gráfico (chartType) e os dados a serem plotados (data).
* intent: adicionar_agenda_simulado: Responda APENAS com JSON no formato {{"intent": "adicionar_agenda_simulado", "entities": {{ "title": "...", "start": "YYYY-MM-DDTHH:mm:ss", "end": "YYYY-MM-DDTHH:mm:ss", "description": "..." }} }}.
* intent: control_ui: Responda APENAS com JSON no formato {{"intent": "control_ui", "entities": {{ "name": "nome_do_card_a_ocultar_ou_mostrar" }} }}. Por exemplo, para "ocultar horas orçadas", a entidade é { "name": "horasOrcadas" }.`;
};

export const getMaestroResponse = async (userPrompt: string, context: ChatContext): Promise<string> => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "Instrução inicial para definir seu comportamento." }],
        },
        {
          role: "model",
          parts: [{ text: getSystemInstruction(userPrompt, context) }],
        },
      ],
    });

    const result = await chatSession.sendMessage(userPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Houve uma momentânea dissonância no nosso motor de entrelaçamento. Não consegui processar a ressonância. Por favor, poderia reformular sua solicitação?";
  }
};

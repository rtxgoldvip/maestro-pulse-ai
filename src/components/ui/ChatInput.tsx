import React, { useState, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';

interface ChatInputProps {
  onSend: (message: string) => void;
  isProcessing: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isProcessing }) => {
  const [inputValue, setInputValue] = useState('');
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported } = useVoiceRecognition();

  useEffect(() => {
    if (transcript && !isListening) {
      setInputValue(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, resetTranscript]);

  const handleSend = () => {
    if (inputValue.trim() && !isProcessing) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isListening ? 'Ouvindo...' : 'Digite sua pergunta ou use o microfone...'}
          disabled={isProcessing || isListening}
          className="pr-12 bg-background/50 border-metallic-light/30 focus:border-primary"
        />
        {isSupported && (
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleVoice}
            disabled={isProcessing}
            className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${
              isListening ? 'text-primary animate-pulse' : 'text-muted-foreground'
            }`}
          >
            <Mic className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Button
        onClick={handleSend}
        disabled={!inputValue.trim() || isProcessing}
        size="icon"
        className="bg-primary hover:bg-primary/90"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

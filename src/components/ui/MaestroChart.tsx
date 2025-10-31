import React from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { MaestroChartType } from '@/types';
import { AmoledCard } from './AmoledCard';

interface MaestroChartProps {
  data: any[];
  type: MaestroChartType;
  title?: string;
  dataKey: string;
  nameKey?: string;
}

const COLORS = ['hsl(var(--quantum-cyan))', 'hsl(var(--quantum-purple))', 'hsl(var(--quantum-blue))', 'hsl(var(--quantum-lime))'];

export const MaestroChart: React.FC<MaestroChartProps> = ({ data, type, title, dataKey, nameKey = 'name' }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--metallic-light))" />
              <XAxis dataKey={nameKey} stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey={dataKey} fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <defs>
                <linearGradient id="grad0" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00FFFF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0080FF" stopOpacity={0.9} />
                </linearGradient>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF00FF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={{ stroke: 'rgba(0,255,255,0.6)', strokeWidth: 2 }}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                innerRadius={70}
                dataKey={dataKey}
                stroke="rgba(0,255,255,0.5)"
                strokeWidth={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#grad${index % 2})`}
                        style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.8))' }} />
                ))}
              </Pie>
              <Tooltip contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.95)',
                border: '2px solid rgba(0,255,255,0.8)',
                borderRadius: '16px',
                boxShadow: '0 0 40px rgba(0,255,255,0.8)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                padding: '12px'
              }} />
              <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', color: 'white' }} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--metallic-light))" />
              <XAxis dataKey={nameKey} stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--metallic-light))" />
              <XAxis dataKey={nameKey} stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <AmoledCard>
      {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
      {renderChart()}
    </AmoledCard>
  );
};

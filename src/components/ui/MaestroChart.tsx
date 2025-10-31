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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={{
                  stroke: 'hsl(var(--foreground) / 0.3)',
                  strokeWidth: 1.5,
                }}
                label={(entry) => entry.name}
                outerRadius={110}
                innerRadius={40}
                fill="hsl(var(--primary))"
                dataKey={dataKey}
                stroke="white"
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${index % COLORS.length})`}
                    style={{
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 191, 255, 0.3)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 32px rgba(0, 191, 255, 0.15)',
                }}
              />
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

'use client';

import { BarChart, FileJson } from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from './ui/chart';

const uviChartData = [
  { name: 'Heat Island', value: 85, fill: 'hsl(var(--chart-1))' },
  { name: 'Air Quality', value: 78, fill: 'hsl(var(--chart-2))' },
  { name: 'Flood Risk', value: 65, fill: 'hsl(var(--chart-3))' },
  { name: 'Resource Access', value: 45, fill: 'hsl(var(--chart-4))' },
];

const uviChartConfig: ChartConfig = {
  value: {
    label: 'Value',
  },
  'Heat Island': {
    label: 'Heat Island',
    color: 'hsl(var(--chart-1))',
  },
  'Air Quality': {
    label: 'Air Quality',
    color: 'hsl(var(--chart-2))',
  },
  'Flood Risk': {
    label: 'Flood Risk',
    color: 'hsl(var(--chart-3))',
  },
  'Resource Access': {
    label: 'Resource Access',
    color: 'hsl(var(--chart-4))',
  },
};


const esmChartData = [
  { name: 'Cooling Effect', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Stormwater Mgmt', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Air Filtration', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Carbon Sequestration', value: 200, fill: 'hsl(var(--chart-4))' },
];

const esmChartConfig: ChartConfig = {
    value: {
        label: 'Value',
    },
    'Cooling Effect': {
        label: 'Cooling Effect',
        color: 'hsl(var(--chart-1))',
    },
    'Stormwater Mgmt': {
        label: 'Stormwater Mgmt',
        color: 'hsl(var(--chart-2))',
    },
    'Air Filtration': {
        label: 'Air Filtration',
        color: 'hsl(var(--chart-3))',
    },
    'Carbon Sequestration': {
        label: 'Carbon Sequestration',
        color: 'hsl(var(--chart-4))',
    },
};


export default function UviEsmCharts() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            <CardTitle className="font-headline text-lg">Data Insights</CardTitle>
        </div>
        <CardDescription>
          Simulated Urban Vulnerability and Ecosystem Service metrics.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-center font-medium text-foreground">Urban Vulnerability Index</h3>
           <ChartContainer config={uviChartConfig} className="h-[250px] w-full">
            <RechartsBarChart data={uviChartData} accessibilityLayer>
              <XAxis
                dataKey="name"
                stroke={tickColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={tickColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
               <ChartTooltipContent />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ChartContainer>
        </div>
        <div>
           <h3 className="mb-4 text-center font-medium text-foreground">Ecosystem Service Value</h3>
            <ChartContainer config={esmChartConfig} className="h-[250px] w-full">
                <PieChart accessibilityLayer>
                <ChartTooltipContent nameKey="name" />
                <Pie
                    data={esmChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                >
                    {esmChartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Legend />
                </PieChart>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

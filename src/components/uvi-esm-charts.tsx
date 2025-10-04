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
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const uviData = [
  { name: 'Heat Island', value: 85, fill: 'var(--color-heat)' },
  { name: 'Air Quality', value: 78, fill: 'var(--color-air)' },
  { name: 'Flood Risk', value: 65, fill: 'var(--color-flood)' },
  { name: 'Resource Access', value: 45, fill: 'var(--color-resource)' },
];

const esmData = [
  { name: 'Cooling Effect', value: 400 },
  { name: 'Stormwater Mgmt', value: 300 },
  { name: 'Air Filtration', value: 300 },
  { name: 'Carbon Sequestration', value: 200 },
];
const COLORS = ['#228B22', '#87CEEB', '#3CB371', '#20B2AA'];


export default function UviEsmCharts() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" />
            <CardTitle className="font-headline text-lg">Data Insights</CardTitle>
        </div>
        <CardDescription>
          Simulated Urban Vulnerability and Ecosystem Service metrics.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-center font-medium">Urban Vulnerability Index</h3>
           <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={uviData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                 <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ 
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                   {uviData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
           <h3 className="mb-4 text-center font-medium">Ecosystem Service Value</h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        contentStyle={{ 
                        background: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        }}
                    />
                    <Pie
                        data={esmData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {esmData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </CardContent>
      <style jsx>{`
        :root {
            --color-heat: #FF6347;
            --color-air: #A9A9A9;
            --color-flood: #4682B4;
            --color-resource: #DAA520;
        }
      `}</style>
    </Card>
  );
}

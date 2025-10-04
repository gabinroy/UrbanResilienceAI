import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { ClipboardList, Lightbulb, BarChart, CheckCircle } from 'lucide-react';
import type { GenerateClimateResilientStrategiesOutput } from '@/ai/flows/generate-climate-resilient-strategies';

type Strategy = GenerateClimateResilientStrategiesOutput['strategies'][0];

interface StrategiesListProps {
  strategies: Strategy[];
}

export default function StrategiesList({ strategies }: StrategiesListProps) {
  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h2 className="font-headline text-xl font-bold">Recommended Strategies</h2>
      </div>
      {strategies.map((strategy, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{strategy.strategyName}</CardTitle>
            <CardDescription>{strategy.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-semibold">
                <Lightbulb className="h-4 w-4 text-accent-foreground" />
                Justification
              </h4>
              <p className="text-sm text-muted-foreground">{strategy.justification}</p>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-semibold">
                <BarChart className="h-4 w-4 text-accent-foreground" />
                Expected Benefits
              </h4>
              <p className="text-sm text-muted-foreground">{strategy.expectedBenefits}</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle className="h-4 w-4 text-accent-foreground" />
                    Implementation Details
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {strategy.implementationDetails}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

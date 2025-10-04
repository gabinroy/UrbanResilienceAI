import type { GenerateClimateResilientStrategiesOutput } from '@/ai/flows/generate-climate-resilient-strategies';
import MapVisualization from './map-visualization';
import StrategiesList from './strategies-list';
import UviEsmCharts from './uvi-esm-charts';

interface ResultsDisplayProps {
  strategies: GenerateClimateResilientStrategiesOutput;
}

export default function ResultsDisplay({ strategies }: ResultsDisplayProps) {
  return (
    <div className="grid gap-8">
      <MapVisualization />
      <UviEsmCharts />
      <StrategiesList strategies={strategies.strategies} />
    </div>
  );
}

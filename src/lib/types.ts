export interface StrategyHistoryItem {
    id: string;
    userId: string;
    city: string;
    strategies: string; // JSON string of GenerateClimateResilientStrategiesOutput
    createdAt: string; // ISO date string
}

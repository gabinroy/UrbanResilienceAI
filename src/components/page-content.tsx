
'use client';

import type { GenerateClimateResilientStrategiesOutput } from '@/ai/flows/generate-climate-resilient-strategies';
import { useEffect, useState } from 'react';
import ResultsDisplay from '@/components/results-display';
import InitialState from '@/components/initial-state';
import LoadingState from '@/components/loading-state';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import type { HistoryItem } from '@/app/history/page';
import StrategyForm from './strategy-form';


export default function PageContent() {
  const [strategies, setStrategies] =
    useState<GenerateClimateResilientStrategiesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const historyId = searchParams.get('historyId');
    if (historyId) {
      setIsLoading(true);
      try {
        const storedHistory = localStorage.getItem('urbanResilienceHistory');
        if (storedHistory) {
          const historyItems: HistoryItem[] = JSON.parse(storedHistory);
          const itemToLoad = historyItems.find(item => item.id === historyId);
          if (itemToLoad) {
            setStrategies(itemToLoad.strategies);
            setError(null);
          } else {
            setError("Failed to find the history item.");
            setStrategies(null);
          }
        }
        // Clean up the URL by replacing the current entry in the history stack
        router.replace('/', undefined);
      } catch (e) {
        setError("Failed to load history item. The data might be corrupted.");
        setStrategies(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchParams, router]);


  const handleFormSubmit = (
    data: GenerateClimateResilientStrategiesOutput | null,
    error: string | null,
    notification: string | null,
    city: string,
    cityOverview: string
  ) => {
    if (notification) {
      toast({
        title: 'API Notice',
        description: notification,
        duration: 15000,
      });
    }

    if (data) {
      setStrategies(data);
      setError(null);
      
      // Save to local storage
      try {
        const historyItem: HistoryItem = {
            id: new Date().toISOString(),
            city,
            cityOverview,
            strategies: data,
            timestamp: new Date().toISOString(),
        };

        const existingHistoryRaw = localStorage.getItem('urbanResilienceHistory');
        const existingHistory: HistoryItem[] = existingHistoryRaw ? JSON.parse(existingHistoryRaw) : [];
        
        // Add new item and keep the history to a reasonable size, e.g., 20 items
        const updatedHistory = [historyItem, ...existingHistory].slice(0, 20);
        
        localStorage.setItem('urbanResilienceHistory', JSON.stringify(updatedHistory));
        
      } catch (e) {
          console.error("Failed to save to history:", e);
          toast({
              variant: "destructive",
              title: "Warning",
              description: "Could not save this generation to your browser's history."
          })
      }

    }
    if (error) {
      setError(error);
      setStrategies(null);
    }
  };

  return (
    <>
        <div className="grid gap-8">
        {isLoading ? (
            <LoadingState />
        ) : strategies ? (
            <ResultsDisplay strategies={strategies} />
        ) : (
            <InitialState error={error} />
        )}
        </div>
        <div className="relative">
            <div className="sticky top-24 grid gap-6">
                <StrategyForm
                    setIsLoading={setIsLoading}
                    onResult={handleFormSubmit}
                />
            </div>
        </div>
    </>
  );
}

'use client';

import type { GenerateClimateResilientStrategiesOutput } from '@/ai/flows/generate-climate-resilient-strategies';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import StrategyForm from '@/components/strategy-form';
import ResultsDisplay from '@/components/results-display';
import InitialState from '@/components/initial-state';
import LoadingState from '@/components/loading-state';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import HistorySidebar from '@/components/history-sidebar';
import type { StrategyHistoryItem } from '@/lib/types';

export default function Home() {
  const [strategies, setStrategies] =
    useState<GenerateClimateResilientStrategiesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [historyKey, setHistoryKey] = useState(0);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleFormSubmit = (
    data: GenerateClimateResilientStrategiesOutput | null,
    error: string | null,
    notification: string | null
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
      setHistoryKey(prev => prev + 1); // Force re-render of history sidebar
    }
    if (error) {
      setError(error);
      setStrategies(null);
    }
  };

  const handleLoadHistory = (item: StrategyHistoryItem) => {
    try {
      const parsedStrategies = JSON.parse(item.strategies);
      setStrategies(parsedStrategies);
      setError(null);
      setIsLoading(false);
    } catch (e) {
      setError("Failed to load history item. The data might be corrupted.");
      setStrategies(null);
    }
  }

  if (isUserLoading || !user) {
    return (
       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="animate-pulse">
            <LoadingState />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[1fr_350px_250px]">
          <div className="grid gap-8">
            {isLoading ? (
              <LoadingState />
            ) : strategies ? (
              <ResultsDisplay strategies={strategies} />
            ) : (
              <InitialState error={error} />
            )}
          </div>
          <div className="grid gap-6">
            <StrategyForm
              setIsLoading={setIsLoading}
              onResult={handleFormSubmit}
            />
          </div>
           <div className="grid gap-6">
            <HistorySidebar 
                key={historyKey} 
                onLoadHistory={handleLoadHistory} 
             />
          </div>
        </div>
      </main>
    </div>
  );
}

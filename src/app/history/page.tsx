'use client';

import Header from '@/components/header';
import LoadingState from '@/components/loading-state';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HistoryList from '@/components/history-list';

export default function HistoryPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="animate-pulse">
          <LoadingState />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="font-headline text-2xl font-bold">Generation History</h1>
            <p className="text-muted-foreground">
              Here are the climate resilience plans you have generated in the past.
            </p>
          </div>
          <HistoryList />
        </div>
      </main>
    </div>
  );
}

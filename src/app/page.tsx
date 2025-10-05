import { Suspense } from 'react';
import Header from '@/components/header';
import StrategyForm from '@/components/strategy-form';
import PageContent from '@/components/page-content';
import LoadingState from '@/components/loading-state';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[1fr_350px]">
          <Suspense fallback={<LoadingState />}>
            <PageContent />
          </Suspense>
          <div className="relative">
            <div className="sticky top-24 grid gap-6">
              {/* The form doesn't depend on searchParams, so it can stay here if we want */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

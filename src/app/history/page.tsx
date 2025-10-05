'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Trash2, Info } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

// Define the shape of a history item
export interface HistoryItem {
  id: string;
  city: string;
  cityOverview: string;
  strategies: any; // Ideally, should match GenerateClimateResilientStrategiesOutput
  timestamp: string;
}

function HistoryClientView() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const storedHistory = localStorage.getItem('urbanResilienceHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to parse history from localStorage', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load history. The data might be corrupted.',
      });
    }
  }, [toast]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('urbanResilienceHistory');
      setHistory([]);
      toast({
        title: 'History Cleared',
        description: 'Your generation history has been successfully cleared.',
      });
    } catch (error) {
      console.error('Failed to clear history from localStorage', error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not clear history.',
      });
    }
  };
  
  const handleViewItem = (item: HistoryItem) => {
    router.push(`/?historyId=${item.id}`);
  }

  if (!isClient) {
    return null; // Don't render server-side
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <History className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Generation History</h1>
        </div>
        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your entire generation history from this browser.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearHistory}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {history.length > 0 ? (
        <div className="grid gap-4">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                  <span>{item.city}</span>
                  <Button variant="outline" size="sm" onClick={() => handleViewItem(item)}>
                    View
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.cityOverview}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Generated on: {new Date(item.timestamp).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex min-h-[40vh] flex-col items-center justify-center border-2 border-dashed bg-card/50 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">No History Found</CardTitle>
          <p className="max-w-md text-muted-foreground">
            You haven&apos;t generated any climate-resilient strategies yet.
          </p>
           <Button asChild className="mt-4">
            <Link href="/">Start Generating</Link>
          </Button>
        </Card>
      )}
    </div>
  )
}


export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <HistoryClientView />
      </main>
    </div>
  );
}

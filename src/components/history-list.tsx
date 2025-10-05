'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import type { StrategyHistoryItem } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HistoryList() {
  const { user } = useUser();
  const firestore = useFirestore();

  const historyQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/history`),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
  }, [user, firestore]);

  const { data: historyItems, isLoading } = useCollection<StrategyHistoryItem>(historyQuery);

  const handleView = (item: StrategyHistoryItem) => {
    const encodedData = encodeURIComponent(item.strategies);
    return `/_loading?history=${encodedData}`;
  };

  return (
    <div className="grid gap-4">
      {isLoading && (
        <>
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="mt-2 h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                 <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          ))}
        </>
      )}
      {!isLoading && historyItems && historyItems.length > 0 ? (
        historyItems.map((item) => (
            <Card key={item.id}>
                <CardHeader className='flex-row items-center justify-between'>
                    <div>
                        <CardTitle>{item.city}</CardTitle>
                        <CardDescription>
                            Generated {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                        </CardDescription>
                    </div>
                    <Button asChild>
                       <Link href={`/?history=${encodeURIComponent(item.strategies)}`}>
                            View Plan
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
        ))
      ) : null}
       {!isLoading && (!historyItems || historyItems.length === 0) && (
        <Card className="flex flex-col items-center justify-center py-16">
            <CardHeader>
                <CardTitle>No History Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-sm text-muted-foreground">You have not generated any plans yet.</p>
                <Button asChild className="mt-4">
                    <Link href="/">Generate Your First Plan</Link>
                </Button>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

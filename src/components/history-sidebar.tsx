'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import type { StrategyHistoryItem } from '@/lib/types';

interface HistorySidebarProps {
  onLoadHistory: (item: StrategyHistoryItem) => void;
}

export default function HistorySidebar({ onLoadHistory }: HistorySidebarProps) {
  const { user } = useUser();
  const firestore = useFirestore();

  const historyQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/history`),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
  }, [user, firestore]);

  const { data: historyItems, isLoading } = useCollection<StrategyHistoryItem>(historyQuery);

  return (
    <Card>
      <CardContent className="p-2">
        <ScrollArea className="h-96">
          {isLoading && (
            <div className="space-y-4 p-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          )}
          {!isLoading && historyItems && historyItems.length > 0 && (
            <div className="space-y-2 p-2">
              {historyItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="h-auto w-full justify-start text-left"
                  onClick={() => onLoadHistory(item)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.city}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          )}
          {!isLoading && (!historyItems || historyItems.length === 0) && (
            <p className="p-4 text-center text-sm text-muted-foreground">No history yet.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

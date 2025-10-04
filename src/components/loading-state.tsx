import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function LoadingState() {
  return (
    <div className="grid gap-8">
      {/* Map Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="aspect-[3/2] w-full" />
        </CardContent>
      </Card>
      
      {/* Charts Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
           <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
      
      {/* Strategies Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
               <Skeleton className="h-4 w-5/6" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

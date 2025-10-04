import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertTriangle, Info } from 'lucide-react';

interface InitialStateProps {
  error: string | null;
}

export default function InitialState({ error }: InitialStateProps) {
  return (
    <Card className="flex min-h-[60vh] flex-col items-center justify-center border-2 border-dashed bg-card/50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Info className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl">Welcome to UrbanResilienceAI</CardTitle>
      </CardHeader>
      <CardContent className="w-full max-w-md text-center">
        {error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <p className="text-muted-foreground">
            Get started by providing an overview of your city in the form on the right. Our AI will analyze the data and generate tailored climate-resilient strategies for you.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

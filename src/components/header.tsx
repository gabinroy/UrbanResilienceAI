import { Logo } from './icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6 lg:px-8">
        <Logo className="h-8 w-8" />
        <h1 className="font-headline text-xl font-bold tracking-tight text-foreground">
          UrbanResilienceAI
        </h1>
      </div>
    </header>
  );
}

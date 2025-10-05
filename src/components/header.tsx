'use client';

import { Logo } from './icons';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6 lg:p-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <Logo className="h-8 w-8" />
            <h1 className="font-headline text-xl font-bold tracking-tight text-foreground">
              UrbanResilienceAI
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

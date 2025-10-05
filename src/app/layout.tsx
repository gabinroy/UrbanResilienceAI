import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'UrbanResilienceAI',
  description: 'Data Pathways to Healthy Cities and Human Settlements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cdefs%3E%3ClinearGradient id='shield-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23d0d3d4' /%3E%3Cstop offset='100%25' stop-color='%23a7abaf' /%3E%3C/linearGradient%3E%3CradialGradient id='bg-gradient' cx='50%25' cy='50%25' r='50%25' fx='50%25' fy='50%25'%3E%3Cstop offset='0%25' stop-color='%230a192f' /%3E%3Cstop offset='100%25' stop-color='%23000000' /%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='128' cy='128' r='128' fill='url(%23bg-gradient)' /%3E%3Cpath d='M 60 120 C 60 180, 128 230, 128 230 C 128 230, 196 180, 196 120 L 196 80 L 60 80 Z' fill='url(%23shield-gradient)' stroke='%23ffffff' stroke-width='4' /%3E%3Cpath d=' M 100 80 L 100 50 L 115 50 L 115 80 Z M 120 80 L 120 40 L 135 40 L 135 80 Z M 140 80 L 140 60 L 155 60 L 155 80 Z M 85 80 L 85 65 L 95 65 L 95 80 Z M 160 80 L 160 70 L 170 70 L 170 80 Z' fill='%23c1d5e0' /%3E%3Cpath d=' M 128 125 L 128 145 M 128 145 L 110 160 M 128 145 L 146 160 M 110 160 L 110 180 M 146 160 L 146 180 M 110 160 L 90 150 M 146 160 L 166 150 M 90 150 L 90 190 M 166 150 L 166 190' stroke='%23a7abaf' stroke-width='2' fill='none' /%3E%3Ccircle cx='128' cy='125' r='3' fill='%23a7abaf' /%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <LoginForm />
      </main>
    </div>
  );
}

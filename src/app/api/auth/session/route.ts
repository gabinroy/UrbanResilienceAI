import { getAdminApp } from '@/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
      const adminApp = await getAdminApp();
      const auth = getAuth(adminApp);
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn,
      });

      cookies().set('session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      
      return NextResponse.json({ status: 'success' });
    } catch (error) {
      console.error('Error creating session cookie:', error);
      return new NextResponse('Failed to create session', { status: 401 });
    }
  }

  return new NextResponse('No token provided', { status: 400 });
}

export async function DELETE(request: NextRequest) {
    cookies().delete('session');
    return NextResponse.json({ status: 'success' });
}

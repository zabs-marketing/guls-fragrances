import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth-options';

/**
 * Call this at the top of any admin API route handler.
 * Returns null when the request is properly authenticated.
 * Returns a 401 NextResponse when not authenticated.
 */
export async function requireAdminSession(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

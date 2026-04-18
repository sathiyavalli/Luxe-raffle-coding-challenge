'use server';

import { clearAuthToken } from '@/lib/auth-cookies';
import { redirect } from 'next/navigation';

export async function logout() {
  await clearAuthToken();
  redirect('/login');
}
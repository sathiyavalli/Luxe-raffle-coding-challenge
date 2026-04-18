'use server';

import { cookies } from 'next/headers';

const TOKEN_COOKIE_NAME = 'auth-token';

// Token TTL: 24 hours
const TOKEN_MAX_AGE = 24 * 60 * 60;

/**
 * Store auth token in HTTP-only cookie
 * This should be called from a server function after successful login
 */
export async function setAuthToken(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_MAX_AGE,
      path: '/',
    });
    return true;
  } catch (error) {
    console.error('Failed to set auth token:', error);
    return false;
  }
}

/**
 * Get auth token from HTTP-only cookie
 * This can be called from server functions/components
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME);
    return token?.value || null;
  } catch (error) {
    console.error('Failed to get auth token:', error);
    return null;
  }
}

/**
 * Clear auth token from HTTP-only cookie
 * This should be called on logout
 */
export async function clearAuthToken() {
  try {
    const cookieStore = await cookies();
    // Set expires to past date to delete the cookie
    cookieStore.set(TOKEN_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set to epoch (past date)
      path: '/',
    });
    return true;
  } catch (error) {
    console.error('Failed to clear auth token:', error);
    return false;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}

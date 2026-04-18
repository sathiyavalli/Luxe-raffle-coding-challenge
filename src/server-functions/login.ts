'use server';

import { API_BASE_URL } from '@/lib/constants';
import { decryptToken } from '@/lib/token';
import { setAuthToken } from '@/lib/auth-cookies';
import { LoginCredentialsSchema, LoginResponseSchema } from '@/types/User';
import { redirect } from 'next/navigation';

export const login = async (email: string, password: string) => {
  try {
    // Validate input credentials
    LoginCredentialsSchema.parse({ email, password });

    // Call the login API
    const response = await fetch(API_BASE_URL + '/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Login failed: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Validate the response structure
    const validatedResponse = LoginResponseSchema.parse(data);
    const token = validatedResponse.token;

    // Decrypt token to verify it's valid user data
    const user = decryptToken(token);
    if (!user) {
      throw new Error('Invalid token received from server');
    }

    // Store token in HTTP-only cookie
    await setAuthToken(token);

    return {
      success: true,
      user,
      message: 'Login successful',
    };
  } catch (error) {
    console.error('Login error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return {
      success: false,
      error: errorMessage,
      message:
        errorMessage === 'Invalid token received from server'
          ? 'Invalid credentials'
          : errorMessage,
    };
  }
};

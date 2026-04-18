import { z } from 'zod';

export type User = {
  id: number;
  email: string;
  firstName: string;
};

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export const LoginCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

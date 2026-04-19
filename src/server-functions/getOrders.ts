'use server';

import { API_BASE_URL } from '@/lib/constants';
import { getAuthToken } from '@/lib/auth-cookies';
import { Order } from '@/types/Order';
import { z } from 'zod';

const OrderResponseSchema = z.array(
  z.object({
    id: z.string(),
    items: z.array(
      z.object({
        id: z.number(),
        quantity: z.number(),
      })
    ),
  })
);

export const getOrders = async (): Promise<Order[]> => {
  try {
    // Get auth token
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    // Fetch orders from API
    const response = await fetch(API_BASE_URL + '/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to fetch orders');
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedOrders = OrderResponseSchema.parse(data);

    return validatedOrders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
};

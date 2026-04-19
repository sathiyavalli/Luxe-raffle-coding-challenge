'use server';

import { API_BASE_URL } from '@/lib/constants';
import { OrderItem } from '@/types/OrderItem';
import { getAuthToken } from '@/lib/auth-cookies';
import { z } from 'zod';

const OrderItemSchema = z.object({
  id: z.number(),
  quantity: z.number().min(1),
});

const OrderSchema = z.object({
  items: z.array(OrderItemSchema),
});

export const order = async (data: { items: OrderItem[] }) => {
  try {
    // Validate input data
    const validData = OrderSchema.parse(data);

    // Get auth token
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    // Call API to place order
    const response = await fetch(API_BASE_URL + '/api/orders', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to place order');
    }

    const order = await response.json();
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Order placement failed:', error);
    throw error;
  }
};

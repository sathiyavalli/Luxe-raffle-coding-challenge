'use server';

import { API_BASE_URL } from '@/lib/constants';
import { RafflesListSchema } from '@/types/Raffle';

export const getRaffles = async () => {
  try {
    const response = await fetch(API_BASE_URL + '/api/raffles', {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch raffles: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate the response with Zod
    const raffles = RafflesListSchema.parse(data);
    return raffles;
  } catch (error) {
    console.error('Error fetching raffles:', error);
    throw error;
  }
};

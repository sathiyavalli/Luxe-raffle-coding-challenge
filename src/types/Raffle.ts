import { z } from 'zod';

export type Raffle = {
  id: number;
  name: string;
  description: string;
  image: string;
  longDescription: string;
  carPrice: number;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
};

// Custom parser for numbers that handles European format (e.g., "2.800.000")
const flexibleNumber = z.union([z.number(), z.string()]).transform((val) => {
  if (typeof val === 'number') return val;
  // Remove dots used as thousand separators
  const cleaned = val.replace(/\./g, '');
  return parseInt(cleaned, 10);
});

export const RaffleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  longDescription: z.string(),
  carPrice: flexibleNumber,
  ticketPrice: z.number(),
  totalTickets: z.number(),
  availableTickets: z.number(),
});

export const RafflesListSchema = z.array(RaffleSchema);

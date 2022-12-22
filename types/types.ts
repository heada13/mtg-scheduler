import { Event } from '@prisma/client';

export interface EventWithStoreAndFormat extends Event {
  stores: {
    store_name: string
  },
  formats: {
    id: number,
    format_name: string
  }
}
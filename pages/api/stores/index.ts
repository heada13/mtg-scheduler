import { Event, Store } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>,
  // res: NextApiResponse,
) {
  const stores = await prisma.store.findMany()
  res.status(200).json(stores)
}
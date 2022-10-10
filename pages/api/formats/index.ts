import { Format } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Format[]>,
) {
  const formats = await prisma.format.findMany()
  res.status(200).json(formats);
}
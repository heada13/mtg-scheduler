import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>,
  // res: NextApiResponse,
) {
  // const query = req.query;
  // const { first, last } = query;
  const authors = await prisma.event.findMany(
    // {
    //   where: {
    //     created_at: {
    //       gte: first,
    //       lt:  last
    //     }
    //   }
    // }
  );
  console.log('author',authors)
  res.status(200).json(authors);
}
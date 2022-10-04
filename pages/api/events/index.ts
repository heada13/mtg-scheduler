import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// type Props = {
//   first: Date,
//   last: Date
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>,
  // res: NextApiResponse,
) {
  const query= req.query;
  const {first, last} = query
  console.log("query",query)
  const events = await prisma.event.findMany(
    {
      where: {
        event_day: {
          gte: first as unknown as Date,
          lt:  last as unknown as Date
        }
      }
    }
  );
  console.log('events',events)
  res.status(200).json(events);
}
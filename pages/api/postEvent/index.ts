// import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postData = req.body;
  const eventPost = await prisma.event.create({
    data: {
        event_name: postData.eventName,
        event_day: postData.date,
        event_store: postData.store,
        event_format: postData.format
      }
    }
  );
  res.status(200).json(eventPost);
}
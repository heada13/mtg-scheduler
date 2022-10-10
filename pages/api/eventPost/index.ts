// import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postData = req.body;
  console.log("postData",postData)
  const eventPost = await prisma.event.create({
    data: {
        event_name: postData.eventName,
        event_day: postData.eventDay,
        event_store: postData.store,
        event_format: postData.format
      }
    }
  );
  console.log('eventPost',eventPost)
  res.status(200).json(eventPost);
}
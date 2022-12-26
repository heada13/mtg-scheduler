// import { Event } from '@prisma/client';
import { EventWithStoreAndFormat } from '../../../types/types'
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// type Props = {
//   first: Date,
//   last: Date
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventWithStoreAndFormat[]>,
  // res: NextApiResponse
) {
  const query= req.query;
  const {first, last} = query
  // async function getEventWithStoreAndFormat() {
    const events = await prisma.event.findMany(
      {
        where: {
          event_day: {
            gte: first as unknown as Date,
            lt:  last as unknown as Date
          }
        },
        include: {
          stores: {select: {
            store_name:true
          }},
          formats: {select: {
            id: true,
            format_name: true
          }}
        }
      }
    );
    // return events
  // }
  // type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
  // type UsersWithPosts = ThenArg<ReturnType<typeof getEventWithStoreAndFormat>>
  // type UsersWithPosts = Prisma.PromiseReturnType<typeof getEventWithStoreAndFormat>

  // const getEvents: UsersWithPosts= await getEventWithStoreAndFormat()
  console.log('events',events)
  res.status(200).json(events);
}
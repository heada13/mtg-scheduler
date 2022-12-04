import { MemberList } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MemberList[]>,
) {
  const query = req.query
  const { member, event } = query
  const castedMember = Number(member)
  const castedEvent = Number(event)
  // console.log("query",uid)
  const regist = await prisma.memberList.findMany({
    where: {
      event_id: castedMember,
      member_id: castedEvent
    }
  })
  res.status(200).json(regist);
}
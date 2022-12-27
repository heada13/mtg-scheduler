import { MemberList } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query
  const { event_id } = query
  const intId = Number(event_id)
  const memberList = await prisma.memberList.findMany({
    select: {
      member_id: true
    },
    where: {
      event_id: intId
    }
  })
  const memberIdList = memberList.map((el) => ({'id': el.member_id}) )
  console.log("memberlist", memberIdList)
  const membersInfo = await prisma.member.findMany({
    where: {
      OR: memberIdList
    }
  })
  res.status(200).json(membersInfo);
}
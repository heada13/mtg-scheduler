import { MemberList } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query
  const { id } = query
  // console.log("query",uid)
  const memberList = await prisma.memberList.findMany({
    select: {
      member_id: true
    },
    where: {
      event_id: id as unknown as number
    }
  })
  const memberIdList = memberList.map((el) => ({'id': el.member_id}) )
  console.log("memberlist", memberIdList)
  const membersInfo = await prisma.member.findMany({
    where: {
      OR: memberIdList
    }
  })
  console.log("info", membersInfo)
  res.status(200).json(membersInfo);
}
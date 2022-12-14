import { MemberList } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MemberList[]|[]>,
) {
  const body = req.body
  const regist = await prisma.memberList.findMany({
    where: body
  })
  res.status(200).json(regist);
}
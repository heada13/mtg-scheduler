import { MemberList } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body
  const unregister = await prisma.memberList.deleteMany({
    where: body
  })
  res.status(200).json(unregister);
}
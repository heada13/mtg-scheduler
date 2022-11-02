import { Member } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member[]>,
) {
  const query = req.query
  const { uid } = query
  console.log("query",uid)
  const member = await prisma.member.findMany({
    where: {
      auth_uid: uid as unknown as string
    }
  })
  res.status(200).json(member);
}
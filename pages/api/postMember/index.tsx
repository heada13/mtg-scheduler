// import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postData = req.body;
  const createMember = await prisma.member.create({
    data: postData
    }
  );
  res.status(200).json(createMember);
}
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postData = req.body;
  console.log("postData",postData)
  const post = await prisma.memberList.create({
    data: postData
    }
  );
  res.status(200).json(post);
}
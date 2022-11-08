import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const update = req.body;
  const updateMember = await prisma.member.update({
    where: {
      
    },
    data: {
      }
    }
  );
  res.status(200).json(updateMember);
}
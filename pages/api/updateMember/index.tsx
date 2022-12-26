import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  const { id } = req.query
  const intId = Number(id)
  const updateMember = await prisma.member.update({
      where: {
        id: intId
      },
      data: data
    }
  );
  console.log("update",updateMember)
  res.status(200).json(updateMember);
}
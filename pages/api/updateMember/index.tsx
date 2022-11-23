import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const update = req.body;
  console.log("req", update)
  const updateMember = await prisma.member.update({
      where: {
        id: update.id
      },
      data: {
        name: update.name,
        image_file_name: update.image_file_name
      }
    }
  );
  console.log("update",updateMember)
  res.status(200).json(updateMember);
}
// import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postData = req.body;
  const postheader = req.headers
  const apiGatewayUrl = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_URL || ""
  const apikey = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_API_KEY || ""
  // const eventPost = await prisma.event.create({
  //   data: {
  //       event_name: postData.eventName,
  //       event_day: postData.date,
  //       event_store: postData.store,
  //       event_format: postData.format
  //     }
  //   }
  // );
  // console.log("body",postheader)
  const imagePost = await fetch(apiGatewayUrl,
    {
    // credentials: 'include',
    method:"POST",
    body: postData,
    headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": apikey,
    }
  })
    // {
    //   method: "POST",
    //   body: postData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "x-api-key": apikey
    //   }
    // }
  console.log("image",imagePost)
  res.status(200).json(imagePost);
}
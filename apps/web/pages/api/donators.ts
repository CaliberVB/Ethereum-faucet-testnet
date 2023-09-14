// eslint-disable-next-line
import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';
import { Donator } from '@interface';

type ResponseData = {
  message: string;
  data: Donator[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const data = (await prisma.donators.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    })) as Donator[];
    res.status(200).json({ message: 'get donators success!', data: data });
  } catch (error) {
    res.status(500).json(error);
  }
}

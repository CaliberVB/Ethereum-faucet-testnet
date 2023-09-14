import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { networkName, amount, address, hash } = req.body;
  try {
    await prisma.donators.create({
      data: {
        networkName: networkName,
        address: address,
        amount: amount,
        hash: hash,
      },
    });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('🚀 ~ file: donator.ts:21 ~ handler ~ error:', error);
    res.status(500).json(error);
  }
}

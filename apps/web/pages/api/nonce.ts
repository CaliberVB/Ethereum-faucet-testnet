import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponse } from '../../../../libs/interface/src/Response';
import { INonceResponseBody, getNonceService } from '@nonceService';

// @ts-ignore
type NonceResponse = DefaultResponse<INonceResponseBody>;

const handler = async (req: NextApiRequest, res: NextApiResponse<NonceResponse>) => {
  const nonceService = getNonceService();
  const nonce = await nonceService.generate();

  res.status(200).json({
    status: 'ok',
    data: {
      nonce,
    },
  });
};

export default handler;

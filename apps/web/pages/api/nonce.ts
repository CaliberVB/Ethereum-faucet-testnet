import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponse } from '../../interfaces/Response';
import { INonceResponseBody, getNonceService } from '../../services/nonce';

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

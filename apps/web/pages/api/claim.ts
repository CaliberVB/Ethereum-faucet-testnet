import type { NextApiRequest, NextApiResponse } from 'next';
import { SignatureMismatchError } from '../../errors/SignatureMismatchError';
import { DefaultResponse } from '../../interfaces/Response';
import { WalletNotEligible } from '../../errors/WalletNotEligible';
import { validateRequest } from '../../services/security';
import { getBlockchainService } from '../../services/blockchains';
import FaucetService from '../../services/faucet/faucetService';
import { Network, getAppConfig } from '../../config';
import { getTransactionHistoryService } from '../../services/transactionHistory';
import { InsufficientFundsError } from '@/errors';
import { getErrorMessage } from '@/utils';

export type ClaimParams = {
  address: string;
  message: string;
  signature: string;
  captcha: string;
  network?: Network;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
  const networkName = req.body.network || 'sepolia';
  const blockchainService = getBlockchainService(networkName);
  try {
    await validateRequest(req);
    const { transactionHistoryType } = getAppConfig();
    const transactionHistoryService = getTransactionHistoryService(transactionHistoryType);
    const faucetService = new FaucetService(blockchainService, transactionHistoryService);

    const { address, message, signature }: ClaimParams = req.body;
    if (!(await faucetService.isEligible(address))) {
      throw new WalletNotEligible();
    }

    if (!(await blockchainService.verifyMessage(address, message, signature))) {
      throw new SignatureMismatchError();
    }
    const txHash = await faucetService.sendFaucet(address);
    return res.status(200).json({ status: 'ok', message: txHash });
  } catch (e: any) {
    if (e.code === 'INSUFFICIENT_FUNDS') {
      const error = new InsufficientFundsError();
      return res
        .status(error.code)
        .json({ status: 'error', message: getErrorMessage(blockchainService.getNetworkConfig(), error.message) });
    }
    return res.status(e.code).json({ status: 'error', message: e.message });
  }
};

export default handler;

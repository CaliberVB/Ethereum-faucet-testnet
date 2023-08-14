import type { NextApiRequest, NextApiResponse } from 'next';
import { SignatureMismatchError } from '../../errors/SignatureMismatchError';
import { DefaultResponse } from '../../interfaces/Response';
import { WalletNotEligible } from '../../errors/WalletNotEligible';
import { validateRequest } from '../../services/security';
import { getBlockchainService } from '../../services/blockchains';
import FaucetService from '../../services/faucet/faucetService';
import { Network, getAppConfig } from '../../config';
import { getTransactionHistoryService } from '../../services/transactionHistory';

export type ClaimParams = {
  address: string;
  message: string;
  signature: string;
  captcha: string;
  network?: Network;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
  try {
    await validateRequest(req);

    //Default network as sepolia
    const networkName = req.body.network || 'sepolia';
    const { transactionHistoryType } = getAppConfig();
    const blockchainService = getBlockchainService(networkName);
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
    return res.status(e.code).json({ status: 'error', message: e.message });
  }
};

export default handler;

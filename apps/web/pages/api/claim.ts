import type { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { SignatureMismatchError, InsufficientFundsError, WalletNotEligible } from '@errors';
import { DefaultResponse, ClaimParams } from '@interface';
import { validateRequest } from '@securityService';
import { getBlockchainService } from '@blockchainService';
import { FaucetService } from '@faucetService';
import { getTrackingServices } from '@trackingService';
import { getErrorMessage, getTrackingServiceParams } from '@utils';
import { getAppConfig } from '@config';

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
  const { trackingType } = getAppConfig();
  const networkName = req.body.network || 'sepolia';
  const blockchainService = getBlockchainService(networkName);
  try {
    await validateRequest(req);
    const transactionHistoryService = getTrackingServices();

    const faucetService = new FaucetService(blockchainService, transactionHistoryService);

    const { address, message, signature }: ClaimParams = req.body;
    const detectedIp = requestIp.getClientIp(req);
    const serviceParams = getTrackingServiceParams(trackingType, {
      ip: detectedIp,
      address: address,
    });
    if (!(await faucetService.isEligible(address, serviceParams))) {
      throw new WalletNotEligible();
    }

    if (!(await blockchainService.verifyMessage(address, message, signature))) {
      throw new SignatureMismatchError();
    }
    const txHash = await faucetService.sendFaucet(address, serviceParams);
    return res.status(200).json({ status: 'ok', message: txHash });
  } catch (e: any) {
    console.error('🚀 ~ file: claim.ts:38 ~ handler ~ e:', e);
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

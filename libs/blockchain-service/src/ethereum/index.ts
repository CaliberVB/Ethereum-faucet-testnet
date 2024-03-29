import { ethers } from 'ethers';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';

import { IBlockchainConfig } from '@config';
import { INonceService, getNonceService } from '@nonceService';
import { IBlockchainService } from '../interfaces';
import { NonceExpiredError } from '@errors';

export const messageTemplate = (nonce: string = '') =>
  `Please sign this message to confirm you own this wallet.\n\n\nNonce: ${nonce}`;

export const extractNonceFromMessage = (message: string) => {
  const truncate = messageTemplate();
  const nonce = message.replace(truncate, '');

  return nonce.trim();
};

export default class Ethereum implements IBlockchainService {
  wallet: ethers.Wallet;
  config: IBlockchainConfig;
  nonceService: INonceService;
  provider: ethers.providers.JsonRpcProvider;

  constructor(networkConfig: IBlockchainConfig) {
    this.config = networkConfig;
    const { providerUrl, chainId, walletPrivateKey } = this.config;

    this.provider = new ethers.providers.JsonRpcProvider(providerUrl, chainId);
    this.wallet = new ethers.Wallet(walletPrivateKey, this.provider);
    this.nonceService = getNonceService();
  }
  getFaucetAmount(isPrivileged: boolean): number {
    const { defaultDailyAmount, privilegedDailyAmount } = this.config;
    return isPrivileged ? privilegedDailyAmount : defaultDailyAmount;
  }

  getNetworkConfig(): IBlockchainConfig {
    return this.config;
  }

  async transfer(address: string, amount: number): Promise<string> {
    const value = ethers.utils.parseEther(amount.toString());

    const transaction = {
      to: address,
      value,
      gasPrice: this.provider.getGasPrice(),
    };
    const tx = await this.wallet.sendTransaction(transaction);
    return tx.hash;
  }

  async isEligible(address: string): Promise<boolean> {
    // Implement additional rule, e.g require wallet to have transactions within last month...

    return true;
  }

  // TODO: send nonce instead of full raw message
  async verifyMessage(address: string, message: string, signature: string): Promise<boolean> {
    const nonce = extractNonceFromMessage(message);
    const isValid = await this.nonceService.verify(nonce);

    if (!isValid) {
      throw new NonceExpiredError();
    }

    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature,
    });

    return address.toLowerCase() === recoveredAddress.toLowerCase();
  }
}

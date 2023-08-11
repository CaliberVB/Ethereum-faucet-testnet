import { ethers } from 'ethers';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';

import { IBlockchainConfig } from '@/config';
import { INonceService, getNonceService } from '@/services/nonce';
import { extractNonceFromMessage } from '@/utils/textMessage';
import { IBlockchainService } from '../interfaces';
import { NonceExpiredError } from '@/errors';

export default class Ethereum implements IBlockchainService {
  wallet: ethers.Wallet;
  config: IBlockchainConfig;
  nonceService: INonceService;

  constructor(networkConfig: IBlockchainConfig) {
    this.config = networkConfig;
    const { providerUrl, networkId, walletPrivateKey } = this.config;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, networkId);
    this.wallet = new ethers.Wallet(walletPrivateKey, provider);
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
    };
    const tx = await this.wallet.sendTransaction(transaction);
    console.log(tx.hash);

    return tx.hash;
  }

  async isEligible(address: string): Promise<boolean> {
    // Implement additional rule, e.g require wallet to have transactions within last month...

    return true;
  }

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

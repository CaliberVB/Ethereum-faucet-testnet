import { FaucetClient, AptosClient } from 'aptos';

import { IBlockchainConfig } from '@config';
import { INonceService, getNonceService } from '@nonceService';
import { IBlockchainService } from '../interfaces';
import { NonceExpiredError } from '@errors';

export const FAUCET_URL = 'https://faucet.testnet.aptoslabs.com';
export const messageTemplate = (nonce: string = '') =>
  `Please sign this message to confirm you own this wallet.\n\n\nNonce: ${nonce}`;

export const extractNonceFromMessage = (message: string) => {
  const truncate = messageTemplate();
  const nonce = message.replace(truncate, '');

  return nonce.trim();
};

export default class Atops implements IBlockchainService {
  aptopsClient: AptosClient;
  config: IBlockchainConfig;
  nonceService: INonceService;
  faucetClient: FaucetClient;

  constructor(networkConfig: IBlockchainConfig) {
    this.config = networkConfig;
    const { providerUrl } = this.config;

    this.aptopsClient = new AptosClient(providerUrl);
    this.nonceService = getNonceService();
    this.faucetClient = new FaucetClient(providerUrl, FAUCET_URL);
  }
  getFaucetAmount(isPrivileged: boolean): number {
    const { defaultDailyAmount, privilegedDailyAmount } = this.config;
    return isPrivileged ? privilegedDailyAmount : defaultDailyAmount;
  }

  getNetworkConfig(): IBlockchainConfig {
    return this.config;
  }

  async transfer(address: string, amount: number): Promise<string> {
    const tx = await this.faucetClient.fundAccount(address, 100_000_000 * amount);
    return tx[0];
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
    return true;
    // const recoveredAddress = recoverPersonalSignature({
    //   data: message,
    //   signature,
    // });

    // return address.toLowerCase() === recoveredAddress.toLowerCase();
  }
}

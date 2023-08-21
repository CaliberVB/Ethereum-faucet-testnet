import { getAppConfig } from '@config';
import { WalletAlreadyFunded } from '@errors';
import { normalizeAddress, getErrorMessage } from '@utils';
import { IBlockchainService } from '@blockchainService';
import { ITrackingService } from '@trackingService';
import { IFaucetService } from './interfaces';

export class FaucetService implements IFaucetService {
  privilegedWallets: string[];

  constructor(
    private readonly blockchainService: IBlockchainService,
    private readonly transactionHistoryServices: ITrackingService[],
  ) {
    const { privilegedWallets } = getAppConfig();
    this.privilegedWallets = privilegedWallets;
  }

  async isEligible(address: string, params: string[]): Promise<boolean> {
    // Privileged wallets aren’t checked for eligibility
    if (this.isPrivileged(address)) {
      return true;
    }
    let i = 0;
    for (const service of this.transactionHistoryServices) {
      const hasReceive = await service.hasReceivedTokens(this.blockchainService.getNetworkConfig().name, params[i]);
      if (hasReceive) {
        let err = new WalletAlreadyFunded();
        err.message = getErrorMessage(this.blockchainService.getNetworkConfig(), err.message);
        throw err;
      }
      i++;
    }
    // Additional faucet policy check at blockchain level
    return this.blockchainService.isEligible(address);
  }

  isPrivileged(address: string): boolean {
    const normalizedAddress = normalizeAddress(address || '');
    return this.privilegedWallets.includes(normalizedAddress);
  }

  async sendFaucet(address: string, params: string[]): Promise<string> {
    let i = 0;
    const { defaultDailyAmount, privilegedDailyAmount } = this.blockchainService.getNetworkConfig();
    const amount = this.isPrivileged(address) ? privilegedDailyAmount : defaultDailyAmount;
    const txHash = await this.blockchainService.transfer(address, amount);
    for (const service of this.transactionHistoryServices) {
      await service.recordTransaction(this.blockchainService.getNetworkConfig().name, params[i]);
      i++;
    }
    return txHash;
  }
}

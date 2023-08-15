import { getAppConfig } from '@config';
import { WalletAlreadyFunded } from '@errors';
import { normalizeAddress } from '@/utils/ethAddressUtils';
import { IBlockchainService } from '@blockchainService';
import { ITrackingService } from '@trackingService';
import { IFaucetService } from './interfaces';
import { getErrorMessage } from '@/utils';

export default class FaucetService implements IFaucetService {
  privilegedWallets: string[];

  constructor(
    private readonly blockchainService: IBlockchainService,
    private readonly transactionHistoryService: ITrackingService,
  ) {
    const { privilegedWallets } = getAppConfig();
    this.privilegedWallets = privilegedWallets;
  }

  async isEligible(address: string): Promise<boolean> {
    // Privileged wallets aren’t checked for eligibility
    if (this.isPrivileged(address)) {
      return true;
    }

    if (
      await this.transactionHistoryService.hasReceivedTokens(this.blockchainService.getNetworkConfig().name, address)
    ) {
      let err = new WalletAlreadyFunded();
      err.message = getErrorMessage(this.blockchainService.getNetworkConfig(), err.message);
      throw err;
    }

    // Additional faucet policy check at blockchain level
    return this.blockchainService.isEligible(address);
  }

  isPrivileged(address: string): boolean {
    const normalizedAddress = normalizeAddress(address || '');
    return this.privilegedWallets.includes(normalizedAddress);
  }

  async sendFaucet(address: string): Promise<string> {
    const { defaultDailyAmount, privilegedDailyAmount } = this.blockchainService.getNetworkConfig();
    const amout = this.isPrivileged(address) ? privilegedDailyAmount : defaultDailyAmount;
    const txHash = await this.blockchainService.transfer(address, amout);

    await this.transactionHistoryService.recordTransaction(this.blockchainService.getNetworkConfig().name, address);
    return txHash;
  }
}

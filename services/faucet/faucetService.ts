import { getAppConfig } from "../../config";
import { WalletAlreadyFunded } from "../../errors/WalletAlreadyFunded";
import { normalizeAddress } from "../../utils/ethAddressUtils";
import { IBlockchainService } from "../blockchains";
import { ITransactionHistoryService } from "../transactionHistory";
import { IFaucetService } from "./interfaces";

export default class FaucetService implements IFaucetService {
  privilegedWallets: string[];
  
  constructor(
    private readonly blockchainService: IBlockchainService,
    private readonly transactionHistoryService: ITransactionHistoryService
  ) {
    const { privilegedWallets } = getAppConfig();
    this.privilegedWallets = privilegedWallets;
  }
  
  async isEligible(address: string) : Promise<boolean> {
    // Privileged wallets aren’t checked for eligibility
    if (await this.isPrivileged(address)) {
      return true;
    }

    if (await this.transactionHistoryService.hasReceivedTokens(address)) {
      throw new WalletAlreadyFunded();
    }

    // Additional faucet policy check at blockchain level
    return this.blockchainService.isEligible(address);
  }

  isPrivileged(address: string) : boolean {
    const normalizedAddress = normalizeAddress(address || "")
    return this.privilegedWallets.includes(normalizedAddress)
  }

  async sendFaucet(address: string) : Promise<string> {
    const {defaultDailyAmount, privilegedDailyAmount} = this.blockchainService.getNetworkConfig();
    const amout = await this.isPrivileged(address) ? privilegedDailyAmount : defaultDailyAmount;
    const txHash = await this.blockchainService.transfer(address, amout);

    await this.transactionHistoryService.recordTransaction(address);
    return txHash
  }
}
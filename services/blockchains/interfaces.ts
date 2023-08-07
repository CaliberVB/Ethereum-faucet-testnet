import { IBlockchainConfig } from "../../config";

export interface IBlockchainService {
  getNetworkConfig(): IBlockchainConfig;
  verifyMessage(address: string, message: string, signature: string): Promise<boolean>;
  isEligible(address: string): Promise<boolean>;
  transfer(receiveAddress: string, amount: number): Promise<string>;
  getFaucetAmount(isPrivileged: boolean): number;
}

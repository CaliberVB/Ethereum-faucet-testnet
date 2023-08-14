import { Network } from '@config';
export interface ITransactionHistoryService {
  hasReceivedTokens(network: Network, address: string, minLayover?: number): Promise<boolean>;
  recordTransaction(network: Network, address: string): Promise<void>;
}

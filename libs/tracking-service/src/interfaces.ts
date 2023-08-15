import { Network } from '@config';
export interface ITrackingService {
  hasReceivedTokens(network: Network, address: string, minLayover?: number): Promise<boolean>;
  recordTransaction(network: Network, address: string): Promise<void>;
}

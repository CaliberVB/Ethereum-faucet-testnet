export interface ITransactionHistoryService {
  hasReceivedTokens(address: string, minLayover?: number): Promise<boolean>;
  recordTransaction(address: string) : Promise<void>;
}

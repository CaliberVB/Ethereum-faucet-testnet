export interface TransactionHistory {
  hasReceivedTokens: (address: string, minLayover?: number) => Promise<boolean>
  checkWalletActivity: (address: string, requiredTxCount?: number, requiredDaysOld?: number) => Promise<boolean>
  recordTransaction: (address: string) => Promise<void>
}

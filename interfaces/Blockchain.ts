export interface Blockchain {
  fundWallet: (address: string) => Promise<string>
  verifyMessage: (address: string, message: string, signature: string) => Promise<boolean>
  isEligible: (address: string) => Promise<void>
}

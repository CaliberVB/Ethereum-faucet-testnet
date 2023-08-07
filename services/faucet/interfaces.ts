export interface IFaucetService {
  isEligible: (address: string) => Promise<boolean>
  isPrivileged: (address: string) => boolean
  sendFaucet: (address: string) => Promise<string>
}
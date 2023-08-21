export interface IFaucetService {
  isEligible: (address: string, params: string[]) => Promise<boolean>;
  isPrivileged: (address: string) => boolean;
  sendFaucet: (address: string, params: string[]) => Promise<string>;
}

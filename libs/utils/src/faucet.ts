import { IBlockchainConfig, TrackingConfig } from '@config';

export function isInsufficientFund(blockChainNetwork: IBlockchainConfig, faucetBalance: string): boolean {
  return +faucetBalance < blockChainNetwork.defaultDailyAmount;
}

export function getTrackingServiceParams(
  trackingConfigs: TrackingConfig,
  // eslint-disable-next-line no-unused-vars
  params: { [K in keyof TrackingConfig]: string },
) {
  let rs = [];
  for (const [key, value] of Object.entries(trackingConfigs)) {
    if (value) rs.push(params[key as keyof TrackingConfig]);
  }
  return rs;
}

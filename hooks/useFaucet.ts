import { getAppConfig } from "../config";

export const useFaucet = (network: string) => {
  const networkConfigs = getAppConfig().blockchainNetworks[network];
  return {
    retrieveAmount: networkConfigs.defaultDailyAmount,
    nativeAsset: networkConfigs.nativeAsset
  }
}

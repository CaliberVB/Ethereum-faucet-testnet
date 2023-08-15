import { IBlockchainConfig } from '@config';

export const messageTemplate = (nonce: string = '') =>
  `Please sign this message to confirm you own this wallet.\n\n\nNonce: ${nonce}`;

export function displayNetworkChainAndSymbol(networkChain: IBlockchainConfig, showAmount: boolean = false) {
  return `${networkChain.displayName} ${showAmount ? networkChain.defaultDailyAmount : ''} ${networkChain.nativeAsset}`;
}

export function getErrorMessage(networkChain: IBlockchainConfig, message: string) {
  return message.replace('{network}', networkChain.displayName).replace('{symbol}', networkChain.nativeAsset);
}

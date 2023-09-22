import { Chain, Config, DAppProvider as DAppProviderCore, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core';

import { useNetWork } from '@/hooks';
import { getAppConfig } from '@config';
const { blockchainNetworks } = getAppConfig();

const DoveChain: Chain = {
  chainId: blockchainNetworks.dove.chainId,
  chainName: 'Dove',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '',
  getExplorerAddressLink: (address: string) => `${blockchainNetworks.dove.blockscanUrl}/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `${blockchainNetworks.dove.blockscanUrl}/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: blockchainNetworks.dove.providerUrl,
  blockExplorerUrl: blockchainNetworks.dove.blockscanUrl,
  nativeCurrency: {
    name: blockchainNetworks.dove.name,
    symbol: blockchainNetworks.dove.nativeAsset,
    decimals: 18,
  },
};

export const DAppProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const { networkChain } = useNetWork();
  let config: Config = {
    readOnlyChainId: networkChain.chainId ?? blockchainNetworks.dove.chainId,
    readOnlyUrls: {
      [blockchainNetworks.goerli.chainId]: blockchainNetworks.goerli.providerUrl || '',
      [blockchainNetworks.sepolia.chainId]: blockchainNetworks.sepolia.providerUrl || '',
      [blockchainNetworks.mumbai.chainId]: blockchainNetworks.mumbai.providerUrl || '',
      [blockchainNetworks.base.chainId]: blockchainNetworks.base.providerUrl || '',
      [blockchainNetworks.arbitrum.chainId]: blockchainNetworks.arbitrum.providerUrl || '',
      [blockchainNetworks.bnb.chainId]: blockchainNetworks.bnb.providerUrl || '',
      [blockchainNetworks.optimism.chainId]: blockchainNetworks.optimism.providerUrl || '',
      [blockchainNetworks.dove.chainId]: blockchainNetworks.dove.providerUrl || '',
    },
    networks: [...DEFAULT_SUPPORTED_CHAINS, DoveChain],
  };

  return <DAppProviderCore config={config}>{children}</DAppProviderCore>;
};

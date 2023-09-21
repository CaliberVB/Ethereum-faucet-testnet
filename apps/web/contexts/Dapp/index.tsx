import { Chain, Config, DAppProvider as DAppProviderCore, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core';

import { useNetWork } from '@/hooks';
import { getAppConfig } from '@config';

const DoveChain: Chain = {
  chainId: 1888,
  chainName: 'Dove',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
  getExplorerAddressLink: (address: string) => `http://54.254.6.15/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `http://54.254.6.15/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'http://18.142.25.163:8545',
  blockExplorerUrl: 'http://54.254.6.15',
  nativeCurrency: {
    name: 'Dove',
    symbol: 'DOVE',
    decimals: 18,
  },
};

export const DAppProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const { networkChain } = useNetWork();
  const { blockchainNetworks } = getAppConfig();
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

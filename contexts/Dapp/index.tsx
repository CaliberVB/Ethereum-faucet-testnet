import { Config, DAppProvider as DAppProviderCore } from '@usedapp/core';

import { useNetWork } from '@/hooks';
import { getAppConfig } from '@/config';
export const DAppProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const { networkChain } = useNetWork();
  const { blockchainNetworks } = getAppConfig();
  let config: Config = {
    readOnlyChainId: networkChain.chainId,
    readOnlyUrls: {
      [blockchainNetworks.goerli.chainId]: blockchainNetworks.goerli.providerUrl || '',
      [blockchainNetworks.sepolia.chainId]: blockchainNetworks.sepolia.providerUrl || '',
      // [blockchainNetworks.mumbai.chainId]: blockchainNetworks.mumbai.providerUrl || '',
      [blockchainNetworks.base.chainId]: blockchainNetworks.base.providerUrl || '',
      [blockchainNetworks.arbitrum.chainId]: blockchainNetworks.arbitrum.providerUrl || '',
      [blockchainNetworks.bnb.chainId]: blockchainNetworks.bnb.providerUrl || '',
    },
  };

  return <DAppProviderCore config={config}>{children}</DAppProviderCore>;
};

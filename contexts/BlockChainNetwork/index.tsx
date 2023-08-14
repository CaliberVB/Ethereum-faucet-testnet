import { IBlockchainConfig, getAppConfig } from '@/config';
import { createContext, useState, useMemo } from 'react';

export interface BlockchainNetworkProviderProps {
  networkChain: IBlockchainConfig;
  onSelectNetworkChain: (networkChain: IBlockchainConfig) => void;
}
const { blockchainNetworks } = getAppConfig();
const defaultNetwork = blockchainNetworks.sepolia;
export const BlockchainNetworkContext = createContext<BlockchainNetworkProviderProps>({
  networkChain: defaultNetwork,
  onSelectNetworkChain: () => {},
});

export const BlockchainNetworkProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const [networkChain, setNetworkChain] = useState<IBlockchainConfig>(defaultNetwork);

  const onSelectNetworkChain = (networkChain: IBlockchainConfig) => {
    setNetworkChain(networkChain);
  };

  const value = useMemo(
    () => ({
      networkChain,
      onSelectNetworkChain,
    }),
    [networkChain],
  );

  return <BlockchainNetworkContext.Provider value={value}>{children}</BlockchainNetworkContext.Provider>;
};

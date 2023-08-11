import { IBlockchainConfig, getAppConfig } from '@/config';
import { createContext, useState, useMemo } from 'react';

export interface BlockchainNetworkProviderProps {
  networkChain?: IBlockchainConfig;
}
export const BlockchainNetworkContext = createContext<BlockchainNetworkProviderProps>({});

export const BlockchainNetworkProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const appConfig = getAppConfig();
  const [networkChain, setNetworkChain] = useState<IBlockchainConfig>(appConfig.blockchainNetworks.sepolia);

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

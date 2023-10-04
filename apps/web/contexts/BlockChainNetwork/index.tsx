import { IBlockchainConfig, Network, getAppConfig } from '@config';
import { getSupportNetworks } from '@utils';
import { useRouter } from 'next/router';
import { createContext, useState, useMemo, useEffect } from 'react';

export interface BlockchainNetworkProviderProps {
  networkChain: IBlockchainConfig;
  onSelectNetworkChain: (networkChain: IBlockchainConfig) => void;
}
const { blockchainNetworks } = getAppConfig();
const supportNetworks = getSupportNetworks();
const defaultNetwork = blockchainNetworks.holesky;
export const BlockchainNetworkContext = createContext<BlockchainNetworkProviderProps>({
  networkChain: defaultNetwork,
  onSelectNetworkChain: () => {},
});

export const BlockchainNetworkProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const {
    query: { network },
  } = useRouter();

  const [networkChain, setNetworkChain] = useState<IBlockchainConfig>(defaultNetwork);

  useEffect(() => {
    if (!network || !supportNetworks.includes(network as Network)) return;
    setNetworkChain(blockchainNetworks[network as Network]);
  }, [network]);

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

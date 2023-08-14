import { BlockchainNetworkContext } from '@/contexts';
import { useContext } from 'react';

export const useNetWork = () => {
  const { networkChain, onSelectNetworkChain } = useContext(BlockchainNetworkContext);
  return {
    networkChain,
    onSelectNetworkChain,
  };
};

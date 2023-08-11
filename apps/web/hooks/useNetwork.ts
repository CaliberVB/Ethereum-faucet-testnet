import { BlockchainNetworkContext } from '@/contexts';
import { useContext } from 'react';

export const useNetWork = () => {
  const { networkChain } = useContext(BlockchainNetworkContext);
  return networkChain;
};

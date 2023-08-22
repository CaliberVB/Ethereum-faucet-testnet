import { useCallback } from 'react';
import { getBlockchainService } from '@blockchainService';
import { getTrackingServices } from '@trackingService';
import { FaucetService } from '@faucetService';
import { Network } from '@config';

export const useWalletClassification = (network: Network) => {
  const blockchainService = getBlockchainService(network);
  const trackingService = getTrackingServices();
  const faucetService = new FaucetService(blockchainService, trackingService);

  const retriveAmount = useCallback((address: string | undefined) => {
    return blockchainService.getFaucetAmount(faucetService.isPrivileged(address || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [retriveAmount];
};

import { useCallback } from 'react';
import { getBlockchainService } from '@blockchainService';
import { getTrackingService } from '@trackingService';
import { FaucetService } from '@faucetService';
import { Network, getAppConfig } from '@config';

export const useWalletClassification = (network: Network) => {
  const { trackingType } = getAppConfig();
  const blockchainService = getBlockchainService(network);
  const trackingService = getTrackingService(trackingType);
  const faucetService = new FaucetService(blockchainService, trackingService);

  const retriveAmount = useCallback((address: string | undefined) => {
    return blockchainService.getFaucetAmount(faucetService.isPrivileged(address || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [retriveAmount];
};

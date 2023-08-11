import { useCallback } from 'react';
import { getBlockchainService } from '../services/blockchains';
import { getTransactionHistoryService } from '../services/transactionHistory';
import FaucetService from '../services/faucet/faucetService';
import { getAppConfig } from '../config';

export const useWalletClassification = (network: string) => {
  const { transactionHistoryType } = getAppConfig();
  const blockchainService = getBlockchainService(network);
  const transactionHistoryService = getTransactionHistoryService(transactionHistoryType);
  const faucetService = new FaucetService(blockchainService, transactionHistoryService);

  const retriveAmount = useCallback((address: string | undefined) => {
    return blockchainService.getFaucetAmount(faucetService.isPrivileged(address || ''));
  }, []);

  return [retriveAmount];
};

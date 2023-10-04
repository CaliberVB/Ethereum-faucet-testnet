import { useCallback, useEffect, useRef, useState } from 'react';
import { getAppConfig } from '@config';
import { useEthers } from '@usedapp/core';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

const holeskyConfig = getAppConfig().blockchainNetworks.holesky;

export const useHoleskyBalance = () => {
  const [holeskyBalance, setHoleskyBalance] = useState<BigNumber | undefined>();
  const [holeskyFaucetBalance, setHoleskyFaucetBalance] = useState<string>('0');
  const timerRef = useRef(null);
  const { account, library, chainId } = useEthers();

  const getHoleskyBalance = useCallback(async () => {
    try {
      const balance = await library.getBalance(account);
      const faucetBalance = await library.getBalance(holeskyConfig.walletAddress);
      setHoleskyBalance(balance);
      setHoleskyFaucetBalance(formatEther(faucetBalance || 0));
    } catch (error) {
      console.error('Get DOVE balance error: ', error);
    }
  }, [account, library]);

  useEffect(() => {
    if (!account || chainId !== holeskyConfig.chainId) return;
    getHoleskyBalance();
    timerRef.current = setInterval(() => {
      getHoleskyBalance();
    }, 5000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [account, chainId, getHoleskyBalance]);

  return {
    holeskyBalance,
    holeskyFaucetBalance,
  };
};

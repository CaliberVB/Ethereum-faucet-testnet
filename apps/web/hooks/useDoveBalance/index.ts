import { useCallback, useEffect, useRef, useState } from 'react';
import { getAppConfig } from '@config';
import { useEthers } from '@usedapp/core';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

const doveConfig = getAppConfig().blockchainNetworks.dove;

export const useDoveBalance = () => {
  const [doveBalance, setDoveBalance] = useState<BigNumber | undefined>();
  const [doveFaucetBalance, setDoveFaucetBalance] = useState<string>('0');
  const timerRef = useRef(null);
  const { account, library, chainId } = useEthers();

  const getDoveBalance = useCallback(async () => {
    try {
      const balance = await library.getBalance(account);
      const faucetBalance = await library.getBalance(doveConfig.walletAddress);
      setDoveBalance(balance);
      setDoveFaucetBalance(formatEther(faucetBalance || 0));
    } catch (error) {
      console.error('Get DOVE balance error: ', error);
    }
  }, [account, library]);

  useEffect(() => {
    if (!account || chainId !== doveConfig.chainId) return;
    getDoveBalance();
    timerRef.current = setInterval(() => {
      getDoveBalance();
    }, 5000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [account, chainId, getDoveBalance]);

  return {
    doveBalance,
    doveFaucetBalance,
  };
};

import { AptosClient } from 'aptos';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAppConfig } from '@config';

const appConfig = getAppConfig();
const aptosClient = new AptosClient(appConfig.blockchainNetworks.aptos.providerUrl);

export const useAptosBalance = (address?: string) => {
  const [balance, setBalance] = useState('0');
  const { account } = useWallet();
  const timerRef = useRef(null);

  const getAptosBalance = useCallback(async () => {
    try {
      const data = (await aptosClient.getAccountResource(
        address ? address : account.address,
        '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
      )) as any;
      setBalance((Number(data?.data?.coin?.value) / 10 ** 8).toString());
    } catch (error) {
      console.error('Get APT balance error: ', error);
    }
  }, [account?.address, address]);

  useEffect(() => {
    if (!account?.address) return;
    getAptosBalance();
    timerRef.current = setInterval(() => {
      getAptosBalance();
    }, 5000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [account?.address, getAptosBalance]);

  return {
    balance,
  };
};

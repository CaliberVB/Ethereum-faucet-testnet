import { FaucetStatus } from '@/components';
import { useEffect, useState } from 'react';
import { useNetWork } from '../useNetwork';

const initialState: FaucetStatus = {
  status: 'default',
};

export const useFaucetAlert = () => {
  const [faucetState, setFaucetState] = useState<FaucetStatus>(initialState);
  const { networkChain } = useNetWork();

  const onSuccess = (txHash: string) => {
    setFaucetState(() => ({
      status: 'success',
      txHash,
    }));
  };

  const onError = (error: string) => {
    setFaucetState(() => ({
      status: 'error',
      error: error,
    }));
  };

  useEffect(() => {
    setFaucetState(initialState);
  }, [networkChain.name]);

  return {
    onSuccess,
    onError,
    networkChain,
    faucetState,
  };
};

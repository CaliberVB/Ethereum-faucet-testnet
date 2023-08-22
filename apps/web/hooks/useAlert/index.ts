import { FaucetStatus } from '@/components';
import { useEffect, useState } from 'react';
import { useNetWork } from '../useNetwork';

const initialState: FaucetStatus = {
  status: 'default',
};

export const useAlert = () => {
  const [alertState, setAlertStateState] = useState<FaucetStatus>(initialState);
  const { networkChain } = useNetWork();

  const onSuccess = (txHash: string) => {
    setAlertStateState(() => ({
      status: 'success',
      txHash,
    }));
  };

  const onError = (error: string) => {
    setAlertStateState(() => ({
      status: 'error',
      error: error,
    }));
  };

  useEffect(() => {
    setAlertStateState(initialState);
  }, [networkChain.name]);

  return {
    onSuccess,
    onError,
    networkChain,
    alertState,
  };
};

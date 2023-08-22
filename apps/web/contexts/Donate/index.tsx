import { useNetWork } from '@/hooks';
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';

export interface DonateState {
  address: string;
  amount: string;
  onChangeAmount: (amount: string) => void;
  walletAmount: string;
  onSetWalletAmount: (amount: string) => void;
}
const DecimalRegex = /^(\d)*(\.)?([0-9])*$/;
export const DonateContext = createContext<DonateState>({} as DonateState);
export const DonateProvider: React.FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const { networkChain } = useNetWork();
  const [amount, setAmount] = useState('');
  const [walletAmount, setWalletAmount] = useState('');

  const onChangeAmount = useCallback((amount: string) => {
    if (!DecimalRegex.test(amount)) return;
    setAmount(amount);
  }, []);

  const onSetWalletAmount = useCallback((amount: string) => {
    setWalletAmount(amount);
  }, []);

  useEffect(() => {
    setAmount('');
  }, [networkChain.name]);

  const value = useMemo(
    () => ({
      amount: amount,
      onChangeAmount: onChangeAmount,
      address: '',
      walletAmount,
      onSetWalletAmount: onSetWalletAmount,
    }),
    [amount, onChangeAmount, onSetWalletAmount, walletAmount],
  );
  return <DonateContext.Provider value={value}>{children}</DonateContext.Provider>;
};

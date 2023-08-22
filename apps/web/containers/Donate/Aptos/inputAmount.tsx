import { InputAmount } from '../InputAmount';
import { DonateContext } from '@/contexts';
import { useMaxAmountAptosTransfer } from '@/hooks';
import { useCallback, useContext } from 'react';

export const AptosInputAmount = () => {
  const { onChangeAmount, amount, walletAmount } = useContext(DonateContext);
  const getMaxAmount = useMaxAmountAptosTransfer();

  const handleSetMaxAmount = useCallback(async () => {
    const amount = await getMaxAmount();
    onChangeAmount(amount);
  }, [getMaxAmount, onChangeAmount]);

  const isError = amount && +amount >= +walletAmount;
  return (
    <InputAmount
      amount={amount}
      onSetMaxAmount={handleSetMaxAmount}
      onChangeAmount={onChangeAmount}
      error={!!isError}
      helperText={isError ? 'Insufficient funds for gas' : ''}
    />
  );
};

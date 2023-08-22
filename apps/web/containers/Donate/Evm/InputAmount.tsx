import { useMaxAmountEtherTransfer } from '@/hooks';
import { InputAmount } from '../InputAmount';
import { DonateContext } from '@/contexts';
import { useCallback, useContext } from 'react';

export const EvmInputAmount = () => {
  const { onChangeAmount, amount, walletAmount } = useContext(DonateContext);

  const maxAmountDonate = useMaxAmountEtherTransfer();

  const handleSetMaxAmount = useCallback(() => {
    onChangeAmount(maxAmountDonate);
  }, [maxAmountDonate, onChangeAmount]);

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

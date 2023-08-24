import { useContext, useEffect, useState } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosConnectWallet, BalanceItem } from '@/components';
import { AptosInputAmount } from './inputAmount';
import { useAlert, useAptosBalance, useNetWork } from '@/hooks';
import { DonateContext } from '@/contexts';
import { getAptosClient } from '@utils';
import { DonateAlert } from '@/components/DonateAlert';

const aptosClient = getAptosClient();
export const AptosDonate = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { networkChain } = useNetWork();
  const { onSetWalletAmount, amount, onChangeAmount } = useContext(DonateContext);
  const { alertState, onError, onSuccess } = useAlert();

  const { balance: walletBalance } = useAptosBalance(account?.address);
  const [isDonating, setIsDonating] = useState(false);

  useEffect(() => {
    onSetWalletAmount(walletBalance);
  }, [walletBalance, onSetWalletAmount]);

  const handleDonate = async () => {
    try {
      setIsDonating(true);
      const transaction = {
        arguments: [networkChain.walletAddress, +amount * 10 ** 8],
        function: '0x1::coin::transfer',
        type: 'entry_function_payload',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      };

      const pendingTransaction = await signAndSubmitTransaction(transaction);

      // In most cases a dApp will want to wait for the transaction, in these cases you can use the typescript sdk
      const txn = await aptosClient.waitForTransactionWithResult(pendingTransaction?.hash);
      if (txn?.hash) {
        onSuccess(txn?.hash);
        onChangeAmount('');
      }
      console.log('🚀 ~ file: index.tsx:40 ~ handleDonate ~ txn:', txn);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:28 ~ handleDonate ~ error:', error);
      onError(error?.message);
    } finally {
      setIsDonating(false);
    }
  };
  return (
    <>
      <BalanceItem
        icon={<PaidIcon />}
        balance={walletBalance}
        symbol={networkChain.nativeAsset}
        title="Available Amount"
      />
      <AptosInputAmount />
      <AptosConnectWallet onClick={handleDonate} text="Donate" isLoading={isDonating} />
      <DonateAlert status={alertState} network={networkChain} />
    </>
  );
};

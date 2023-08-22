import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core';
import { ethers } from 'ethers';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button } from '@mui/material';
import { formatEther } from 'ethers/lib/utils';

import { BalanceItem, LoadingButton } from '@/components';
import { DonateContext } from '@/contexts';
import { useAlert, useHasMetamask, useNetWork } from '@/hooks';
import { EvmInputAmount } from './InputAmount';
import { DonateAlert } from '@/components/DonateAlert';

export const EvmDonate = () => {
  const installed = useHasMetamask();
  const [isSwitching, setIsSwitching] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const { networkChain } = useNetWork();
  const { onSetWalletAmount, amount, onChangeAmount } = useContext(DonateContext);
  const { sendTransaction } = useSendTransaction();
  const { account, isLoading: isConnecting, activateBrowserWallet, switchNetwork, chainId } = useEthers();
  const { alertState, onError, onSuccess } = useAlert();

  const accountBalance = useEtherBalance(account, { refresh: 'everyBlock', chainId: networkChain.chainId });
  const accountBalanceStr = accountBalance && formatEther(accountBalance);

  useEffect(() => {
    onSetWalletAmount(accountBalanceStr);
  }, [accountBalanceStr, onSetWalletAmount]);

  const handleChangeNetwork = async () => {
    try {
      setIsSwitching(true);
      await switchNetwork(networkChain.chainId);
      activateBrowserWallet();
    } catch (error) {
      console.error('switching network error', error);
    } finally {
      setIsSwitching(false);
    }
  };

  const handleDonate = async () => {
    try {
      if (!window.ethereum) return;
      setIsDonating(true);
      const amountTransfer = ethers.utils.parseEther(amount || '0');
      const transactionParam = {
        from: account,
        to: networkChain.walletAddress,
        value: amountTransfer,
      };
      const tx = await sendTransaction(transactionParam);
      console.log('🚀 ~ file: index.tsx:50 ~ handleDonate ~ tx:', tx);
      if (tx?.transactionHash) {
        onSuccess(tx?.transactionHash);
        onChangeAmount('');
      }
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:54 ~ handleDonate ~ error:', error);
      onError(error?.message);
    } finally {
      setIsDonating(false);
    }
  };
  const renderButton = () => {
    if (!installed) {
      return (
        <Link href="https://metamask.io/download/" passHref>
          <Button variant="contained" fullWidth>
            Install MetaMask
          </Button>
        </Link>
      );
    }
    if (!account && !isSwitching) {
      return (
        <LoadingButton variant="contained" onClick={() => activateBrowserWallet()} fullWidth loading={isConnecting}>
          Connect wallet
        </LoadingButton>
      );
    }
    if (chainId !== networkChain.chainId) {
      return (
        <LoadingButton
          variant="contained"
          onClick={handleChangeNetwork}
          fullWidth
          loading={isSwitching}
          loadingPosition="end"
          endIcon={<span></span>}
        >
          Switch to {networkChain.name} network
        </LoadingButton>
      );
    }

    return (
      <LoadingButton
        disabled={!+amount || +amount > +accountBalanceStr}
        fullWidth
        variant="contained"
        loadingPosition="end"
        endIcon={<span></span>}
        onClick={handleDonate}
        loading={isDonating}
      >
        {isDonating ? 'Donating' : 'Donate'}
      </LoadingButton>
    );
  };
  return (
    <>
      <BalanceItem
        icon={<WalletIcon />}
        balance={accountBalanceStr}
        symbol={networkChain.nativeAsset}
        title="Available Amount"
      />
      <EvmInputAmount />
      {renderButton()}
      <DonateAlert status={alertState} network={networkChain} />
    </>
  );
};
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core';
import { ethers } from 'ethers';
import PaidIcon from '@mui/icons-material/Paid';
import { Button } from '@mui/material';
import { formatEther } from 'ethers/lib/utils';

import { BalanceItem, LoadingButton } from '@/components';
import { DonateContext } from '@/contexts';
import { useAlert, useDoveBalance, useHasMetamask, useNetWork, useHoleskyBalance } from '@/hooks';
import { EvmInputAmount } from './InputAmount';
import { DonateAlert } from '@/components/DonateAlert';
import { addGaEvent } from '@utils';
import { addDonator } from '@apiService';

export const EvmDonate = () => {
  const installed = useHasMetamask();
  const [isSwitching, setIsSwitching] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const { networkChain } = useNetWork();
  const { onSetWalletAmount, amount, onChangeAmount, onSetDonateId } = useContext(DonateContext);
  const { sendTransaction } = useSendTransaction();
  const { account, isLoading: isConnecting, activateBrowserWallet, switchNetwork, chainId } = useEthers();
  const { alertState, onError, onSuccess } = useAlert();

  const accountBalance = useEtherBalance(account, { refresh: 'everyBlock', chainId: networkChain.chainId });
  const { doveFaucetBalance } = useDoveBalance();
  const { holeskyFaucetBalance } = useHoleskyBalance();

  const accountBalanceStr = accountBalance && formatEther(accountBalance);
  let balanceDisplay = accountBalanceStr;
  if (networkChain.name === 'dove') balanceDisplay = doveFaucetBalance;

  if (networkChain.name === 'holesky') balanceDisplay = holeskyFaucetBalance;
  useEffect(() => {
    onSetWalletAmount(balanceDisplay);
  }, [balanceDisplay, onSetWalletAmount]);

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
      addGaEvent({
        eventName: 'donate',
        action: 'Donate Testnet Token',
        category: networkChain.name,
        label: '',
        value: '',
      });
      const tx = await sendTransaction(transactionParam);
      if (tx?.transactionHash) {
        onSuccess(tx?.transactionHash);
        onChangeAmount('');
      }
      addDonator({
        address: account,
        amount: amount,
        networkName: networkChain.name,
        hash: tx?.transactionHash,
      }).then(() => {
        onSetDonateId();
      });
    } catch (error) {
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
        disabled={!+amount || +amount > +balanceDisplay}
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
        icon={<PaidIcon />}
        balance={balanceDisplay}
        symbol={networkChain.nativeAsset}
        title="Available Amount"
      />
      <EvmInputAmount />
      {renderButton()}
      <DonateAlert status={alertState} network={networkChain} />
    </>
  );
};

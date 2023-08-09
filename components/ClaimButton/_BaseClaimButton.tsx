import Link from 'next/link';
import { isNil } from 'lodash';

import { ethers } from 'ethers';
import { Sepolia, useEthers } from '@usedapp/core';

import { Button, styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useHasMetamask } from '@/hooks/useHasMetamask';
import { claimTokens, retrieveNonce } from '@/services/HttpClient';
import { messageTemplate } from '@/utils/textMessage';
import { useState } from 'react';

type BaseClaimButtonProps = {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  retrieveCaptcha: () => Promise<string>;
};

export const LoadingButtonBase = styled(LoadingButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  margin: '2px',
  padding: '3px',
  paddingLeft: '10px',
  backgroundColor: '#0061e2',
  color: 'white',
  borderRadius: '8px',
  textDecoration: 'none',
}));

export const BaseClaimButton = ({ onSuccess, onError, retrieveCaptcha }: BaseClaimButtonProps) => {
  const { account, library, isLoading: isConnecting, activateBrowserWallet, switchNetwork, chainId } = useEthers();
  const [isClaiming, setIsClaiming] = useState(false);
  const installed = useHasMetamask();

  const claimSepoliaEth = async () => {
    try {
      if (isNil(library) || isNil(account)) {
        throw new Error('Wallet is not connected');
      }
      setIsClaiming(true);
      const captchaToken = await retrieveCaptcha();

      const nonce = await retrieveNonce();
      const message = messageTemplate(nonce);

      const signer = (library as ethers.providers.JsonRpcProvider).getSigner();
      const signature = await signer.signMessage(message);

      const txHash = await claimTokens(account as string, message, signature, captchaToken);
      console.log(txHash.message);
      onSuccess(txHash.message);
    } catch (e: any) {
      if (e.name === 'AxiosError' && e.response.data.message) {
        onError(e.response.data.message);
        return;
      }

      onError(e?.message || 'Something went wrong');
    } finally {
      setIsClaiming(false);
    }
  };

  if (!installed) {
    return (
      <Link href="https://metamask.io/download/" passHref>
        <Button variant="contained" fullWidth>
          Install MetaMask
        </Button>
      </Link>
    );
  }
  if (!account) {
    return (
      <LoadingButtonBase variant="contained" onClick={() => activateBrowserWallet()} fullWidth loading={isConnecting}>
        Connect wallet
      </LoadingButtonBase>
    );
  }

  if (chainId !== Sepolia.chainId) {
    return (
      <LoadingButtonBase variant="contained" onClick={() => switchNetwork(Sepolia.chainId)} fullWidth>
        Switch to Sepolia network
      </LoadingButtonBase>
    );
  }

  return (
    <LoadingButtonBase
      fullWidth
      variant="contained"
      loading={isClaiming}
      onClick={claimSepoliaEth}
      loadingPosition="end"
      endIcon={<span></span>}
    >
      {isClaiming ? 'Claiming...' : 'Claim Sepolia ETH'}
    </LoadingButtonBase>
  );
};

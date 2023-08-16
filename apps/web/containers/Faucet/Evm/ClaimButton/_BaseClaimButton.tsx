import Link from 'next/link';
import { isNil } from 'lodash';

import { ethers } from 'ethers';
import { useEthers } from '@usedapp/core';

import { Button } from '@mui/material';

import { useHasMetamask } from '@/hooks/useHasMetamask';
import { claimTokens, retrieveNonce } from '@apiService';
import { messageTemplate } from '@utils';
import { useState } from 'react';
import { LoadingButton } from '@/components';
import { useNetWork } from '@/hooks';
import { ClaimButtonProps } from './ClaimButton';

export interface BaseClaimButtonProps extends ClaimButtonProps {
  retrieveCaptcha?: () => Promise<string>;
}

export const BaseClaimButton = ({ onSuccess, onError, retrieveCaptcha }: BaseClaimButtonProps) => {
  const { account, library, isLoading: isConnecting, activateBrowserWallet, switchNetwork, chainId } = useEthers();
  const [isClaiming, setIsClaiming] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const installed = useHasMetamask();
  const { networkChain } = useNetWork();

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
  const handleClaim = async () => {
    try {
      if (isNil(library) || isNil(account)) {
        throw new Error('Wallet is not connected');
      }
      setIsClaiming(true);
      const captchaToken = await retrieveCaptcha?.();

      const nonce = await retrieveNonce();
      const message = messageTemplate(nonce);

      const signer = (library as ethers.providers.JsonRpcProvider).getSigner();
      const signature = await signer.signMessage(message);
      // account as string, message, signature, captchaToken
      const txHash = await claimTokens({
        address: account,
        message: message,
        network: networkChain.name,
        signature: signature,
        captcha: captchaToken,
      });
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
  if (!account && !isSwitching) {
    return (
      <LoadingButton variant="contained" onClick={() => activateBrowserWallet()} fullWidth loading={isConnecting}>
        Connect wallet
      </LoadingButton>
    );
  }

  if (chainId !== networkChain.chainId) {
    return (
      <LoadingButton variant="contained" onClick={handleChangeNetwork} fullWidth>
        Switch to {networkChain.name} network
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      loading={isClaiming}
      onClick={handleClaim}
      loadingPosition="end"
      endIcon={<span></span>}
    >
      {isClaiming ? 'Claiming...' : `Claim ${networkChain.name}  ${networkChain.nativeAsset}`}
    </LoadingButton>
  );
};

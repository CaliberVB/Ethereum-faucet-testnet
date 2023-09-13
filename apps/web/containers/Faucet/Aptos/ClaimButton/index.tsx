import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useState } from 'react';
import { claimTokens, retrieveNonce } from '@apiService';
import { addGaEvent, messageTemplate } from '@utils';
import { useNetWork } from '@/hooks';
import { BaseClaimButtonProps } from '../../Evm/ClaimButton/_BaseClaimButton';
import { AptosConnectWallet, TwitterLogin } from '@/components';
import { useSession } from 'next-auth/react';

export const ClaimButton: React.FunctionComponent<BaseClaimButtonProps> = ({ onError, onSuccess, retrieveCaptcha }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { signMessage, account } = useWallet();
  const { status } = useSession();

  const { networkChain } = useNetWork();

  const handleFaucet = async () => {
    try {
      setIsClaiming(true);
      const captchaToken = await retrieveCaptcha?.();
      const nonce = await retrieveNonce();
      const message = messageTemplate(nonce);
      const signedData = await signMessage({
        message: message,
        nonce: nonce,
      });
      addGaEvent({
        eventName: 'claim',
        action: 'Claim Testnet Token',
        category: networkChain.name,
        label: '',
        value: '',
      });
      const txHash = await claimTokens({
        address: account.address,
        message: message,
        network: networkChain.name,
        signature: signedData.signature as string,
        captcha: captchaToken,
      });
      onSuccess(txHash.message);
    } catch (error) {
      console.error('Faucet APT error', error);
      onError(error?.response?.data?.message);
    } finally {
      setIsClaiming(false);
    }
  };
  if (status === 'unauthenticated') return <TwitterLogin />;
  return <AptosConnectWallet onClick={handleFaucet} text="Claim APT" isLoading={isClaiming} />;
};

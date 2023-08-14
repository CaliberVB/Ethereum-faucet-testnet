import { Alert } from '@mui/material';
import { useMemo, useState } from 'react';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useNetWork } from '@/hooks';
import { ClaimButton } from '../ClaimButton';

type FaucetState =
  | {
      status: 'success';
      txHash: string;
    }
  | {
      status: 'default';
    }
  | {
      status: 'error';
      error: string;
    };

const initialState: FaucetState = {
  status: 'default',
};

export const ClaimFaucet = () => {
  const [faucetState, setFaucetState] = useState<FaucetState>(initialState);
  const { networkChain } = useNetWork();

  const handleSuccess = (txHash: string) => {
    setFaucetState(() => ({
      status: 'success',
      txHash,
    }));
  };

  const handleError = (error: string) => {
    setFaucetState(() => ({
      status: 'error',
      error: error,
    }));
  };

  const faucetStatus = useMemo(() => {
    if (faucetState.status === 'error') return <Alert severity="error">{faucetState.error}</Alert>;
    if (faucetState.status === 'success')
      return (
        <Alert severity="success">
          {networkChain.displayName} {networkChain.nativeAsset} has been dispatched to your wallet. <br />
          You should receive it within 1-3 minutes.
          <br />
          TxHash:
          <br />{' '}
          <Link href={`${networkChain.blockscanUrl}/tx/${faucetState.txHash}`} passHref>
            <MuiLink target="_blank" rel="noopener referrer">
              {faucetState.txHash}
            </MuiLink>
          </Link>
        </Alert>
      );
    return null;
  }, [faucetState, networkChain]);

  return (
    <div>
      <ClaimButton onSuccess={handleSuccess} onError={handleError} />
      <div style={{ marginTop: 16 }}>{faucetStatus}</div>
    </div>
  );
};

import { ClaimButton } from '@/components';
import { Alert } from '@mui/material';
import { useMemo, useState } from 'react';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

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
          Sepolia ETH has been dispatched to your wallet. <br />
          You should receive it within 1-3 minutes.
          <br />
          TxHash:
          <br />{' '}
          <Link href={`https://sepolia.etherscan.io/tx/${faucetState.txHash}`} passHref>
            <MuiLink target="_blank" rel="noopener referrer">
              {faucetState.txHash}
            </MuiLink>
          </Link>
        </Alert>
      );
    return null;
  }, [faucetState]);

  return (
    <div>
      <ClaimButton onSuccess={handleSuccess} onError={handleError} />
      {faucetStatus}
    </div>
  );
};

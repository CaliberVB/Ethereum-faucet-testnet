import { IBlockchainConfig } from '@config';
import { Alert } from '@mui/material';
import Link from 'next/link';

export type FaucetStatus =
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

export interface FaucetAlertProps {
  status?: FaucetStatus;
  network?: IBlockchainConfig;
}

export const FaucetAlert: React.FunctionComponent<FaucetAlertProps> = ({ status, network }) => {
  if (status?.status === 'error') return <Alert severity="error">{status?.error}</Alert>;
  if (status?.status === 'success')
    return (
      <Alert severity="success">
        {network?.displayName} {network?.nativeAsset} has been dispatched to your wallet. <br />
        You should receive it within 1-3 minutes.
        <br />
        TxHash:
        <br />{' '}
        <Link href={`${network?.blockscanUrl.replace('{txhash}', status?.txHash)}`} passHref target="_blank">
          {status?.txHash}
        </Link>
      </Alert>
    );
  return null;
};

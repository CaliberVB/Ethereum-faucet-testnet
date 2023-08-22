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

export interface DonateAlertProps {
  status?: FaucetStatus;
  network?: IBlockchainConfig;
}

export const DonateAlert: React.FunctionComponent<DonateAlertProps> = ({ status, network }) => {
  if (status?.status === 'error') return <Alert severity="error">{status?.error}</Alert>;
  if (status?.status === 'success')
    return (
      <Alert severity="success">
        We&apos;re honored by your donation. Thank you for being a part of our mission.
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

import { Network } from '@config';

export type ClaimParams = {
  address: string;
  message: string;
  signature: string;
  captcha: string;
  network?: Network;
};

export type Donator = {
  address: string;
  networkName: Network;
  amount: string;
  id?: number;
  hash: string;
};

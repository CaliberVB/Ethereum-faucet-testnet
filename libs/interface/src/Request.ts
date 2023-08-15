import { Network } from '@config';

export type ClaimParams = {
  address: string;
  message: string;
  signature: string;
  captcha: string;
  network?: Network;
};

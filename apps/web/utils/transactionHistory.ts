import { Network } from '@config';
export function generateKey(network: Network, address: string): string {
  return `${network}|${address}`;
}
export function getKeys(key: string) {
  const keyArr = key.split('|');
  return {
    network: keyArr[0] as Network,
    address: keyArr[1] as string,
  };
}

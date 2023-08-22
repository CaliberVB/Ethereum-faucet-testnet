import { useCallback, useContext } from 'react';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { DonateContext } from '@/contexts';
import { useGasPrice } from '@usedapp/core';
import { useNetWork } from '../useNetwork';
import { getAptosClient } from '@utils';

export function useMaxAmountEtherTransfer() {
  const { networkChain } = useNetWork();
  const { walletAmount } = useContext(DonateContext);
  const gasPrice = useGasPrice({
    chainId: networkChain.chainId,
    refresh: 'everyBlock',
  });
  const gasLimit = 21000;
  const gasFee = gasPrice?.mul(gasLimit) || 0;
  const walletAmountBig = ethers.utils.parseUnits(walletAmount || '0', 18);
  const maxAmount = ethers.BigNumber.from(walletAmountBig)?.sub(gasFee);
  const maxAmountStr = formatEther(maxAmount);
  return maxAmountStr;
}

const aptosClient = getAptosClient();
export function useMaxAmountAptosTransfer() {
  const { walletAmount } = useContext(DonateContext);
  const getMaxAmount = useCallback(async () => {
    const gasPrice = await aptosClient.estimateGasPrice();
    const gasLimit = 10;
    const gasFee = (gasPrice.gas_estimate * gasLimit) / 10 ** 8;
    return (+walletAmount - gasFee)?.toString();
  }, [walletAmount]);

  return getMaxAmount;
}

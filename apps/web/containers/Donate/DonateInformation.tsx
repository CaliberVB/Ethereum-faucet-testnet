import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { Copy, Item } from '@/components';
import { SelectBlockchainNetwork } from '../SelectNetwork';
import { useNetWork } from '@/hooks';

export const DonateInformation = () => {
  const { networkChain } = useNetWork();
  return (
    <>
      <SelectBlockchainNetwork />
      <Item
        style={{
          paddingBottom: 6,
          paddingTop: 6,
        }}
      >
        <WalletIcon />
        <span>Address:</span>
        <span style={{ marginRight: 8 }}>
          {networkChain.name === 'aptos'
            ? `${networkChain.walletAddress.slice(0, 30)}...${networkChain.walletAddress.slice(-12)}`
            : networkChain.walletAddress}
        </span>
        <Copy textToCopy={networkChain.walletAddress} />
      </Item>
    </>
  );
};

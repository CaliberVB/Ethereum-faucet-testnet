import { useFaucetAlert } from '@/hooks';
import { ClaimButton } from './ClaimButton';
import { FaucetAlert } from '@/components';

export const ClaimFaucet = () => {
  const { faucetState, networkChain, onError, onSuccess } = useFaucetAlert();
  return (
    <div>
      <ClaimButton onSuccess={onSuccess} onError={onError} />
      <div style={{ marginTop: 16 }}>
        <FaucetAlert status={faucetState} network={networkChain} />
      </div>
    </div>
  );
};

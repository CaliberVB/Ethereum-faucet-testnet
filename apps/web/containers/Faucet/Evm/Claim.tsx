import { useAlert } from '@/hooks';
import { ClaimButton } from './ClaimButton';
import { FaucetAlert } from '@/components';

export const ClaimFaucet = () => {
  const { alertState, networkChain, onError, onSuccess } = useAlert();
  return (
    <div>
      <ClaimButton onSuccess={onSuccess} onError={onError} />
      <div style={{ marginTop: 16 }}>
        <FaucetAlert status={alertState} network={networkChain} />
      </div>
    </div>
  );
};

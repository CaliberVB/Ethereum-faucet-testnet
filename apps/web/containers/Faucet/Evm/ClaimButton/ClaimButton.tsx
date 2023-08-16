import { useSession } from 'next-auth/react';

import { BaseClaimButton } from './_BaseClaimButton';
import { GoogleReCaptchaClaimButton } from './_GoogleReCaptchaClaimButton';
import { Spinner } from '@/components';

import { getAppConfig } from '@config';

export interface ClaimButtonProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}
export const ClaimButton: React.FunctionComponent<ClaimButtonProps> = (props) => {
  const { status } = useSession();
  const enableCaptcha = getAppConfig().enableCaptcha;

  if (status === 'loading') {
    return <Spinner />;
  }

  if (enableCaptcha) return <GoogleReCaptchaClaimButton {...props} />;
  const retrieveCaptcha = async (): Promise<string> => {
    return Promise.resolve('');
  };
  return <BaseClaimButton {...props} retrieveCaptcha={retrieveCaptcha} />;
};

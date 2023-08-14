import { getAppConfig } from '@config';
import { PropsWithChildren } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface CaptchaProviderProps {
  children: JSX.Element;
}

export const CaptchaProvider: React.FunctionComponent<PropsWithChildren<CaptchaProviderProps>> = ({ children }) => {
  const { enableCaptcha, captchaSecretKey } = getAppConfig();
  if (!enableCaptcha) return children;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={captchaSecretKey} language="en">
      {children}
    </GoogleReCaptchaProvider>
  );
};

import { NextApiRequest } from 'next';
import { GoogleReCaptcha } from './googleReCaptcha';
import { getAppConfig } from '@config';

export const validateRequest = async (req: NextApiRequest) => {
  const { enableCaptcha, captchaSecretKey } = getAppConfig();

  if (enableCaptcha) {
    const captchaService = new GoogleReCaptcha(captchaSecretKey);
    const captchaToken = req.body.captcha;

    await captchaService.verifyCaptcha(captchaToken);
  }
};

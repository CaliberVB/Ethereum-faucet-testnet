import { NextApiRequest } from "next";
import { getAppConfig } from "../../config";
import { GoogleReCaptcha } from "./googleReCaptcha";

export const validateRequest = async (req: NextApiRequest) => {
  const {enableCaptcha, captchaSecretKey} = getAppConfig();

  if (enableCaptcha) {
    const captchaService = new GoogleReCaptcha(captchaSecretKey);
    const captchaToken = req.body.captcha;

    await captchaService.verifyCaptcha(captchaToken)
  }

}
import axios from 'axios';
import { InvalidCaptcha } from '@/errors';

export interface Captcha {
  verifyCaptcha(token: string): Promise<void>;
}

export class GoogleReCaptcha implements Captcha {
  constructor(private readonly apiKey: string) {}

  async verifyCaptcha(token: string): Promise<void> {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.apiKey}&response=${token}`;
    const response = await axios.post(url).then((response) => response.data);

    if (response.success !== true) {
      throw new InvalidCaptcha();
    }
  }
}

export class InvalidCaptcha extends Error {
  code = 403;
  override message = 'Provided captcha was invalid.';
}

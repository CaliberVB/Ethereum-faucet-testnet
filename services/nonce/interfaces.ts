export interface INonceResponseBody {
  nonce: string
}

export interface INonceService {
  generate: () => Promise<string>
  verify: (nonce: string) => Promise<boolean>
}

export interface INonceResponseBody {
  nonce: string
}

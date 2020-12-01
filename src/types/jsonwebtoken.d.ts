import { VerifyOptions } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions,
  ): { iss?: string };
}

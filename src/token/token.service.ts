import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

@Injectable()
export class TokenService {
  async createAccessTokenString(userId: string): Promise<string> {
    const expireTime: number = +config.get('app.tokenExpire');
    return await jwt.sign(
      {
        sub: userId,
        exp: Math.floor(Date.now() / 1000) + expireTime,
      },
      config.get('app.secretKey'),
      { algorithm: config.get('app.algorithm') },
    );
  }
}

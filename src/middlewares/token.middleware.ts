import { NextFunction, Request, Response } from 'express';
import { BadRequestException, FactoryProvider, GatewayTimeoutException } from '@nestjs/common';
import { isJWT } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';


export const tokenMiddlewareFactory: FactoryProvider<(
  req: Request,
  res: Response,
  next: NextFunction,
) => void> = {
  provide: 'token.middleware',
  useFactory: () => {
    return function checkAccessTokenMiddleware(
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      if (req.url === '/auth/register' || req.url === '/auth/login') {
        next();
        return;
      }
      if (!req.header('access_token')) {
        next(new BadRequestException('wrong_data', 'access_token was not passed'));
      }
      if (!isJWT(req.header('access_token'))) {
        next(new BadRequestException('wrong_data', 'invalid token'));
      }

      try {
        const token = jwt.verify(
          req.header('access_token'),
          config.get('app.secretKey'),
        );
        req.userId = token.sub;
        next();
      } catch (err) {
        next(new GatewayTimeoutException('wrong_data', 'token expired'));
      }
    }
  }
}

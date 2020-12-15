import {
  BadRequestException,
  GatewayTimeoutException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import { isJWT } from 'class-validator';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Food Diary')
    .setDescription('Food Diary API description')
    .setVersion('1.0')
    .addTag('fd')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const jsonParser = bodyParser.json();
  app.use(jsonParser);

  app.use(getUserIdMiddleware);

  await app.listen(config.get('app.port'));

  return app;
}

async function getUserIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.url === '/auth/register' || req.url === '/auth/login') {
    next();
    return;
  }
  if (!req.body.access_token) {
    next(new BadRequestException('wrong_data', 'access_token was not passed'));
  }
  if (!isJWT(req.body.access_token)) {
    next(new BadRequestException('wrong_data', 'invalid token'));
  }

  try {
    const token = await jwt.verify(
      req.body.access_token,
      config.get('app.secretKey'),
    );
    console.log(token.sub);
    req.userId = token.sub;
    next();
  } catch (err) {
    next(new GatewayTimeoutException('wrong_data', 'token expired'));
  }
}

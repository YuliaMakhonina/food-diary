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
    throw new BadRequestException();
  }
  try {
    const token = await jwt.verify(
      req.body.access_token,
      config.get('app.secretKey'),
    );
    req.userId = token.sub;
    next();
  } catch (err) {
    throw new GatewayTimeoutException(err);
  }
}

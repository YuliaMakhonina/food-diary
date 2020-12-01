import { BadRequestException, GatewayTimeoutException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const secretKey: string = 'food-diary-secret-number-one';
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Food Diary')
    .setDescription('Food Diary API description')
    .setVersion('1.0')
    .addTag('fd')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  let jsonParser = bodyParser.json();
  app.use(jsonParser);
  app.use(async function(req: Request, res: Response, next: NextFunction) {
    if (req.url === '/auth/register' || req.url === '/auth/login') {
      next();
      return;
    }
    if (!req.body.access_token) {
      throw new BadRequestException();
    }
    try {
      let token = await jwt.verify(req.body.access_token, secretKey);
      req.userId = token.iss;
      next();
    } catch (err) {
      throw new GatewayTimeoutException(err);
    }
  });

  await app.listen(3000);
}
bootstrap();

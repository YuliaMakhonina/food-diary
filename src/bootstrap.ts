import {
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  app.use(await app.get('token.middleware'));

  await app.listen(config.get('app.port'));

  return app;
}

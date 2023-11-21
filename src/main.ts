import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no esta incluido en la definicion del objeto
      forbidNonWhitelisted: true, // Retorna un bad request si hay propiedades en el objeto no requeridas

   
    })
  );

    app.use(cors({
    origin: 'http://localhost:3001', // dirección de la aplicación React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  ;
  app.use(express.json()); // Middleware para analizar solicitudes JSON

  await app.listen(3000);
}
bootstrap();

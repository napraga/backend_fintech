import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para todos los orígenes
  app.enableCors({
    origin: 'http://localhost:4200',  // Reemplaza con el origen de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());

  await app.listen(3000);
}
bootstrap();

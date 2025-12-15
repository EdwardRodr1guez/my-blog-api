import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita la validación automática de DTOs en toda la app
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe()); // Valida os DTOs que estão na aplicação -> npm i class-validator class-transformer
  //app.useGlobalInterceptors(new LogInterceptor()); //Intercepta os dados de requisições de todos os endpoints de todos os controllers
  await app.listen(3000);
}
bootstrap();

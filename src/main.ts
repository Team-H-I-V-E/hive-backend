import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DTO 유효성 검증
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  console.log('서버가 실행중입니다.')
}
bootstrap();

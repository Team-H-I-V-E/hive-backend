import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:4200', // 허용할 출처
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 쿠키와 인증 정보를 포함할지 여부
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('서버가 실행중입니다.');
}
bootstrap();

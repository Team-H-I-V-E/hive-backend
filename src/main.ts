import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 쿠키 파서 미들웨어
  app.use(cookieParser());

  // CORS 설정
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // 이미지 파일 제공
  const imagesPath = path.join(process.cwd(), 'public', 'images');
  app.use('/images', express.static(imagesPath));

  // 업로드 정적 파일 제공 (예: 3D 모델 파일 등)
  const uploadPath = path.join(process.cwd(), 'uploads');
  console.log('Serving uploads from:', uploadPath);
  app.use(
    '/uploads',
    express.static(join(__dirname, '..', 'uploads'), {
      setHeaders: (res, path) => {
        if (path.endsWith('.glb')) {
          res.setHeader('Content-Type', 'model/gltf-binary');
        }
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`서버 실행 중: http://localhost:${port}`);
}
bootstrap();

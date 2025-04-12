import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  const imagesPath = path.join(process.cwd(), 'public', 'images');
  app.use('/images', express.static(imagesPath));


  // 정적 파일 제공 (절대 경로 사용)
  const uploadPath = path.join(process.cwd(), 'uploads');
  console.log(' Serving uploads from:', uploadPath);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.glb')) {
        res.setHeader('Content-Type', 'model/gltf-binary');
      }
    },
  }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`서버 실행 중: http://localhost:${port}`);
}
bootstrap();


import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { typeOrmConfig } from './configs/typeorm.config';
import { HeritageModule } from './heritage/heritage.module';
import { ArExploreModule } from './arExplore/arExplore.module';
import { ArticleModule } from './article/article.module';
import { PanoramaModule } from './panorama/panorama.module';
import { ArticleFavoriteModule } from './favorite/articleFavorite.module';
import { PanoramaFavoriteModule } from './favorite/panoramaFavorite.module';
import { Heritage3DModelModule } from './heritage/heritage.3dModel.moduel';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as sqlite3 from 'sqlite3';
import { MulterModule } from '@nestjs/platform-express';
import { MiniMapPointModule } from './panorama/panorama.miniMap.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // 파일 저장 경로
      limits: { fileSize: 100 * 1024 * 1024 }, // 100MB로 제한 증가

    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/', 
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticleModule,
    PanoramaModule,
    ArticleFavoriteModule,
    PanoramaFavoriteModule,
    HeritageModule,
    ConfigModule.forRoot(),
    Heritage3DModelModule,
    ArExploreModule,
    AuthModule,
    UserModule,
    MiniMapPointModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: 'DATABASE_CONFIG',
      useValue: new sqlite3.Database('path_to_db.db'),
    }
  ],
  exports: ['DATABASE_CONFIG']
})
export class AppModule {}
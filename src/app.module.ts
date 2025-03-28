import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { typeOrmConfig } from './configs/typeorm.config';
import { HeritageModule } from './heritage/heritage.module';
import { ArticleModule } from './article/article.module';
import { PanoramaModule } from './panorama/panorama.module';
import { ArticleFavoriteModule } from './favorite/articleFavorite.module';
import { PanoramaFavoriteModule } from './favorite/panoramaFavorite.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/', // http://localhost:3000/images/xxx.jpg
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    HeritageModule,
    ArticleModule,
    PanoramaModule,
    ArticleFavoriteModule,
    PanoramaFavoriteModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
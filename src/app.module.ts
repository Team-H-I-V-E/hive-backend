
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from './heritage/entities/heritage.entity';
import { HeritageModule } from './heritage/heritage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { PanoramaViewerModule } from './panorama/panorama.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { ArticleFavoriteModule } from './favorite/articleFavorite.module';
import { LikedArticleMoudle } from './likedArticle/liked.module';
import { PanoramaFavoriteModule } from './favorite/panoramaFavorite.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseSync } from 'node:sqlite';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticleModule,
    PanoramaViewerModule,
    ArticleFavoriteModule,
    LikedArticleMoudle,
    PanoramaFavoriteModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [
     {
        provide: 'DATABASE_CONFIG',
        useValue: DatabaseSync,
    }
  ],
  exports: ['DATABASE_CONFIG']
})
export class AppModule {}

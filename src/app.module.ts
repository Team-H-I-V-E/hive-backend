import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from './heritage/entities/heritage.entity';
import { HeritageModule } from './heritage/heritage.module';
import { ArExperienceModule } from './arExperience/arExperience.module';
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



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticleModule,
    PanoramaViewerModule,
    ArticleFavoriteModule,
    LikedArticleMoudle,
    PanoramaFavoriteModule,
    HeritageModule
    UserModule,
    AuthModule,
    ArExperienceModule,
  ],
  controllers: [],
  providers: [
     {
        provide: APP_PIPE,
        useClass: ValidationPipe,
    },
  ]
})
export class AppModule {}
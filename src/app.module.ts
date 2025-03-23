import { Module } from '@nestjs/common';
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
import { Heritage3DModel } from './heritage/entities/heritage3dModel.entity';
import { Heritage3DModelModule } from './heritage/heritage.3dModel.moduel';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticleModule,
    PanoramaViewerModule,
    ArticleFavoriteModule,
    LikedArticleMoudle,
    PanoramaFavoriteModule,
    HeritageModule,
    Heritage3DModelModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

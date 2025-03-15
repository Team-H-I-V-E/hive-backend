import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { PanoramaViewerModule } from './panorama/panorama.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ArticleFavoriteModule } from './favorite/articleFavorite.module';
import { LikedArticleMoudle } from './likedArticle/liked.module';
import { PanoramaFavoriteModule } from './favorite/panoramaFavorite.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticleModule,
    PanoramaViewerModule,
    ArticleFavoriteModule,
    LikedArticleMoudle,
    PanoramaFavoriteModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
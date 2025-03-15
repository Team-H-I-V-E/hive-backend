import { Module } from "@nestjs/common";
import { ArticleFavoriteController } from "./controller/articleFavorite.controller";
import { ArticleFavoriteService } from "./service/articleFavorite.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleFavorite } from "./entities/articleFavorite.entity";
import { ArticleModule } from "src/article/article.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleFavorite]),
        ArticleModule,
    ],
    controllers: [ArticleFavoriteController],
    providers: [ArticleFavoriteService],
})
export class ArticleFavoriteModule {}
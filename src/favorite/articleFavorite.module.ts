import { Module } from "@nestjs/common";
import { ArticleFavoriteController } from "./controller/articleFavorite.controller";
import { ArticleFavoriteService } from "./service/articleFavorite.service";

@Module({
    imports: [ArticleFavoriteService],
    controllers: [ArticleFavoriteController],
    providers: [],
})
export class ArticleFavoriteModule {}
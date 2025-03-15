import { Module } from "@nestjs/common";
import { LikedArticleService } from "./service/likedArticle.service";
import { LikedArticleController } from "./controller/likedArticle.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikedArticle } from "./entities/likedArticle.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LikedArticle])],
    controllers: [LikedArticleController],
    providers: [LikedArticleService]
})
export class LikedArticleMoudle {}
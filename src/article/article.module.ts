import { Module } from "@nestjs/common";
import { Article } from "./entities/article.entity";
import { ArticlesController } from "./controller/article.controller";
import { ArticlesService } from "./service/article.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Article]),
      ],
      controllers: [ArticlesController],
      providers: [ArticlesService]
})
export class ArticleModule {}
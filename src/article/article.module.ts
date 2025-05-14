import { Module } from "@nestjs/common";
import { Article } from "./entities/article.entity";
import { ArticlesController } from "./controller/article.controller";
import { ArticlesService } from "./service/article.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Article]),
        AuthModule,
      ],
      controllers: [ArticlesController],
      providers: [ArticlesService],
      exports: [TypeOrmModule.forFeature([Article])]
})
export class ArticleModule {}
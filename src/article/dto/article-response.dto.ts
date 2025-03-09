import { IsNotEmpty } from "class-validator";
import { Article } from "../entities/article.entity";

export class ArticleResponseDto {
    constructor(article: Article) {
        this.article = article;
    }

    @IsNotEmpty()
    article: Article;
}
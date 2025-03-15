import { IsNotEmpty } from "class-validator";
import { Article } from "../entities/article.entity";

export class ArticleResponseDto {

    @IsNotEmpty()
    article: Article;

    constructor(article: Article) {
        this.article = article;
    }

}
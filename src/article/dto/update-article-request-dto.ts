import { ArticleStatus } from "../entities/article-status.enum";

export class UpdateArticleDto {
    author: string;
    title: string;
    contents: string;
    status: ArticleStatus;
}
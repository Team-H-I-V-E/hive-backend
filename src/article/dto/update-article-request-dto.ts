import { ArticleStatus } from "../entities/article-status.enum";

export class UpdateArticleDto {
    userID: string;
    articleTitle: string;
    articleContents: string;
}
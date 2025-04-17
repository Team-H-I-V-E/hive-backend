import { Article } from "../entities/article.entity";

export class ArticleResponseDto {
    articleId: number;
    userId: number;
    articleTitle: string;
    articleContents: string;
    articleCreatedAt: Date;
    articleImages: string[];

    constructor(article: Article) {
        this.articleId = article.articleId;
        this.userId = article.userId;
        this.articleTitle = article.articleTitle;
        this.articleContents = article.articleContents;
        this.articleCreatedAt = article.articleCreatedAt;
        this.articleImages = article.articleImages?.map(img => img.articleImage) || [];
    }
}
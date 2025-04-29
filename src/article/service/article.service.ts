import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { UpdateArticleDto } from '../dto/update-article-request-dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>
    ) { }

    async getArticles(page: number, limit: number) {
        const skip = (page - 1) * limit;
        return this.articleRepository.find({
            skip: skip,
            take: limit,
            order: { articleCreatedAt: 'DESC' },
            relations: ['articleImages'],
        });
    }

    async getArticleDetailById(articleId: number): Promise<Article> {
        const foundArticle = await this.articleRepository.findOne({
            where: { articleId },
            relations: ['articleImages']
        });
        if (!foundArticle) {
            throw new NotFoundException(`Article with Id ${articleId} not found`);
        }
        return foundArticle;
    }


    async getArticlesById(userId: number): Promise<Article[]> {
        if (!userId) {
            throw new BadRequestException('Author keyword must be provided');
        }
        const foundArticles = await this.articleRepository.findBy({ userId: userId })
        if (foundArticles.length === 0) {
            throw new NotFoundException(`No articles found for author: ${userId}`);
        }
        return foundArticles;
    }

    async createArticle(payload: {
        userId: number;
        articleTitle: string;
        articleContents: string;
        articleImages: string[];
    }): Promise<Article> {
        const { userId, articleTitle, articleContents, articleImages } = payload;

        if (!userId || !articleTitle || !articleContents) {
            throw new BadRequestException('Author, title, and contents must be provided');
        }

        const newArticle = this.articleRepository.create({
            userId,
            articleTitle,
            articleContents,
            articleImages: articleImages?.map(imagePath => ({
                articleImage: imagePath
            })) || []
        });

        return await this.articleRepository.save(newArticle);
    }

    async updateArticleById(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const foundArticle = await this.getArticleDetailById(id);
        const { articleTitle, articleContents } = updateArticleDto;
        if (!articleTitle || !articleContents) {
            throw new BadRequestException('Title and contents must be provided');
        }
        foundArticle.articleTitle = articleTitle;
        foundArticle.articleContents = articleContents;
        const updatedArticle = await this.articleRepository.save(foundArticle)
        return updatedArticle;
    }

    async deleteArticleById(id: number): Promise<void> {
        const result = await this.articleRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
        }
    }
}
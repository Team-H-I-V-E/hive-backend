import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article-request-dto';
import { UpdateArticleDto } from '../dto/update-article-request-dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articleRepository : Repository<Article>
    ){}

    async getAllArticles(): Promise<Article[]> {
        const foundArticles = await this.articleRepository.find();
        return foundArticles;
    }

    async getArticleDetailByID(articleID: number): Promise<Article> {
        const foundArticle = await this.articleRepository.findOneBy({ articleID: articleID });
        if(!foundArticle) {
            throw new NotFoundException(`Article with ID ${articleID} not found`);
        }
        return foundArticle;
    }

    async getArticlesByID(userID: number): Promise<Article[]> {
        if (!userID) {
            throw new BadRequestException('Author keyword must be provided');
        }
        const foundArticles = await this.articleRepository.findBy({ userID: userID })
        if (foundArticles.length === 0) {
            throw new NotFoundException(`No articles found for author: ${userID}`);
        }
        return foundArticles;
    }

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const { userID, articleTitle, articleContents, articleImage } = createArticleDto;
        if (!userID || !articleTitle || !articleContents ) {
            throw new BadRequestException('Author, title, and contents must be provided');
        }
        const newArticle: Article = {
            articleID: 0,
            userID,
            articleTitle,
            articleContents,
            articleImage,
            articleCreatedAt: new Date(),
        };
        const createdArticle = await this.articleRepository.save(newArticle);
        return createdArticle;
    }
    
    async updateArticleById(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const foundArticle = await this.getArticleDetailByID(id);
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
        const foundArticle = await this.getArticleDetailByID(id);
        await this.articleRepository.delete(foundArticle);
    }
}

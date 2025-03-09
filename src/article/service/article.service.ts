import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article-request-dto';
import { ArticleStatus } from '../entities/article-status.enum';
import { UpdateArticleDto } from '../dto/update-article-request-dto';

@Injectable()
export class ArticlesService {
    // Repository 계층 DI
    constructor(
        @InjectRepository(Article)
        private articleRepository : Repository<Article>
    ){}

    // 게시글 조회 기능
    async getAllArticles(): Promise<Article[]> {
        const foundArticles = await this.articleRepository.find();
        return foundArticles;
    }

    // 특정 게시글 조회 기능
    async getArticleDetailById(articleID: number): Promise<Article> {
        const foundArticle = await this.articleRepository.findOneBy({ articleID: articleID });
        if(!foundArticle) {
            throw new NotFoundException(`Article with ID ${articleID} not found`);
        }
        return foundArticle;
    }

    // 키워드(작성자)로 검색한 게시글 조회 기능
    async getArticlesByKeyword(userID: number): Promise<Article[]> {
        if (!userID) {
            throw new BadRequestException('Author keyword must be provided');
        }
        const foundArticles = await this.articleRepository.findBy({ userID: userID })
        if (foundArticles.length === 0) {
            throw new NotFoundException(`No articles found for author: ${userID}`);
        }
        return foundArticles;
    }

    // 게시글 작성 기능
    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const { userID, articleTitle, articleContents, articleImage } = createArticleDto;
        if (!userID || !articleTitle || !articleContents) {
            throw new BadRequestException('Author, title, and contents must be provided');
        }
        const newArticle: Article = {
            articleID: 0, // 임시 초기화
            userID, // author: createArticleDto.author
            articleTitle,
            articleContents,
            articleImage,
            articleCreatedAt: new Date(),
        };
        const createdArticle = await this.articleRepository.save(newArticle);
        return createdArticle;
    }
    
    // 특정 번호의 게시글 수정
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

    // 게시글 삭제 기능
    async deleteArticleById(id: number): Promise<void> {
        const foundArticle = await this.getArticleDetailById(id);
        await this.articleRepository.delete(foundArticle);
    }
}

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
    async getArticleDetailById(id: number): Promise<Article> {
        const foundArticle = await this.articleRepository.findOneBy({ id: id });
        if(!foundArticle) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return foundArticle;
    }

    // 키워드(작성자)로 검색한 게시글 조회 기능
    async getArticlesByKeyword(author: string): Promise<Article[]> {
        if (!author) {
            throw new BadRequestException('Author keyword must be provided');
        }
        const foundArticles = await this.articleRepository.findBy({ author: author })
        if (foundArticles.length === 0) {
            throw new NotFoundException(`No articles found for author: ${author}`);
        }
        return foundArticles;
    }

    // 게시글 작성 기능
    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const { author, title, contents, image } = createArticleDto;
        if (!author || !title || !contents) {
            throw new BadRequestException('Author, title, and contents must be provided');
        }
        const newArticle: Article = {
            id: 0, // 임시 초기화
            author, // author: createArticleDto.author
            title,
            contents,
            image,
            status: ArticleStatus.PUBLIC
        };
        const createdArticle = await this.articleRepository.save(newArticle);
        return createdArticle;
    }
    
    // 특정 번호의 게시글 수정
    async updateArticleById(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const foundArticle = await this.getArticleDetailById(id);
        const { title, contents } = updateArticleDto;
        if (!title || !contents) {
            throw new BadRequestException('Title and contents must be provided');
        }
        foundArticle.title = title;
        foundArticle.contents = contents;
        const updatedArticle = await this.articleRepository.save(foundArticle)
        return updatedArticle;
    }

    // 게시글 삭제 기능
    async deleteArticleById(id: number): Promise<void> {
        const foundArticle = await this.getArticleDetailById(id);
        await this.articleRepository.delete(foundArticle);
    }
}

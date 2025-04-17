import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticlesService } from '../service/article.service';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article-request-dto';
import { UpdateArticleDto } from '../dto/update-article-request-dto';
import { ArticleResponseDto } from '../dto/article-response.dto';

@Controller('api/articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) { }

    @Get('/')
    async getAllArticles(): Promise<Article[]> {
        const articles: Article[] = await this.articlesService.getAllArticles();
        return articles;
    }

    @Get('/detail/:id')
    async getArticleDetailById(@Param('id') articleId: number): Promise<Article> {
        return await this.articlesService.getArticleDetailById(articleId);
    }


    @Get('/search/:userId')
    async getArticlesById(@Param('userId') userId: number): Promise<Article[]> {
        return await this.articlesService.getArticlesById(userId);
    }


    @Post('/')
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<ArticleResponseDto> {
        const articleResponseDto = new ArticleResponseDto(await this.articlesService.createArticle(createArticleDto))
        return articleResponseDto;
    }

    @Put('/:id')
    async updateArticleById(
        @Param('id') id: number,
        @Body() updateArticleDto: UpdateArticleDto): Promise<ArticleResponseDto> {
        const articleResponseDto = new ArticleResponseDto(await this.articlesService.updateArticleById(id, updateArticleDto))
        return articleResponseDto;
    }

    @Delete('/:id')
    async deleteArticleById(@Param('id') id: number): Promise<void> {
        await this.articlesService.deleteArticleById(id);
    }

}
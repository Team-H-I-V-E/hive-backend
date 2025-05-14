import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from '../service/article.service';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article-request-dto';
import { UpdateArticleDto } from '../dto/update-article-request-dto';
import { ArticleResponseDto } from '../dto/article-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService){}

    @Get('/')
    async getAllArticles(): Promise<Article[]> {
	    const articles: Article[] = await this.articlesService.getAllArticles();
        return articles;
    }

    @Get('/detail/:id')
    async getArticleDetailByID(articleID: number): Promise<Article> {
        const article: Article = await this.articlesService.getArticleDetailByID(articleID);
        return article;
    }

    @Get('/search/:keyword')
    async getArticlesByID(@Query('userID') userID: number): Promise<Article[]> {
        const articles: Article[] = await this.articlesService.getArticlesByID(userID);
        return articles;
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
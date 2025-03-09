import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from '../service/article.service';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article-request-dto';
import { UpdateArticleDto } from '../dto/update-article-request-dto';
import { ArticleResponseDto } from '../dto/article-response.dto';

@Controller('api/articles')
@UsePipes(ValidationPipe)
export class ArticlesController {
    constructor(private articlesService: ArticlesService){}

    // 게시글 조회 기능
    @Get('/')
    async getAllArticles(): Promise<Article[]> {
	    const articles: Article[] = await this.articlesService.getAllArticles();
        return articles;
    }

    // 키워드(작성자)로 검색한 게시글 조회 기능
    @Get('/search/:keyword')
    async getArticlesByKeyword(@Query('userID') userID: number): Promise<Article[]> {
        const articles: Article[] = await this.articlesService.getArticlesByKeyword(userID);
        return articles;
    }

    // 게시글 작성 기능
    @Post('/')
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<ArticleResponseDto> {
        const articleResponseDto = new ArticleResponseDto(await this.articlesService.createArticle(createArticleDto))
        return articleResponseDto;
    }

    // 특정 번호의 게시글 수정
    @Put('/:id')
    async updateArticleById(
        @Param('id') id: number,
        @Body() updateArticleDto: UpdateArticleDto): Promise<ArticleResponseDto> {
        const articleResponseDto = new ArticleResponseDto(await this.articlesService.updateArticleById(id, updateArticleDto))
        return articleResponseDto;
    }

    // 게시글 삭제 기능
    @Delete('/:id')
    async deleteArticleById(@Param('id') id: number): Promise<void> {
        await this.articlesService.deleteArticleById(id);
    }
}
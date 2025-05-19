import { Body, Query, UseGuards, Controller, Get, Post, Put, Delete, Param, UploadedFiles, UseInterceptors, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArticlesService } from '../service/article.service';
import { Article } from '../entities/article.entity';
import { UpdateArticleDto } from '../dto/update-article-request-dto';
import { ArticleResponseDto } from '../dto/article-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) { }
  
    @Get('')
    async getArticles(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.articlesService.getArticles(page, limit);
    }

    // ✅ 단일 게시글 조회
    @Get('/detail/:id')
    async getArticleDetailById(@Param('id') articleId: number): Promise<Article> {
        return await this.articlesService.getArticleDetailById(articleId);
    }

    // ✅ 특정 유저 게시글 조회
    @Get('/search/:userId')
    async getArticlesById(@Param('userId') userId: number): Promise<Article[]> {
        return await this.articlesService.getArticlesById(userId);
    }

    // ✅ 게시글 작성
    @Post('/')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: './uploads/article',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        })
    )
    async createArticle(
        @UploadedFiles() files: Express.Multer.File[],
        @Req() req: Request
    ): Promise<ArticleResponseDto> {
        const body = req.body;

        console.log('📥 Body:', body);
        console.log('📸 Files:', files);

        // 임시 userId 설정 (로그인 구현 전용)
        if (!body.userId) body.userId = 1;

        const created = await this.articlesService.createArticle({
            userId: Number(body.userId),
            articleTitle: body.articleTitle,
            articleContents: body.articleContents,
            articleImages: files.map((file) => file.filename),
        });

        return new ArticleResponseDto(created);
    }

    // ✅ 게시글 수정
    @Put('/:id')
    async updateArticleById(
        @Param('id') id: number,
        @Req() req: Request
    ): Promise<ArticleResponseDto> {
        const updated = await this.articlesService.updateArticleById(id, req.body as UpdateArticleDto);
        return new ArticleResponseDto(updated);
    }

    // ✅ 게시글 삭제
    @Delete('/:id')
    async deleteArticleById(@Param('id') id: number): Promise<void> {
        await this.articlesService.deleteArticleById(id);
    }
}

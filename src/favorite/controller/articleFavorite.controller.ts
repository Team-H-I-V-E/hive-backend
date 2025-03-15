import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ArticleFavoriteService } from "../service/articleFavorite.service";
import { Article } from "src/article/entities/article.entity";
import { CreateArticleFavoriteDto } from "../dto/articleFavorite/create-articleFavorite.dto";

@Controller('api/articleFavorites')
export class ArticleFavoriteController {

    constructor(private articleFavoriteService: ArticleFavoriteService) {}

    // 즐겨찾기한 게시글 모두 조회
    @Get('/:userID')
    async getAllArticleFavorite(userID: number): Promise<Article[]> {
        const articles: Article[] = await this.articleFavoriteService.getAllArticleFavorite(userID);
        return articles;
    }

    // 게시글 즐겨찾기 추가
    @Post('/')
    async createArticleFavorite(@Body() createArticleFavoriteDto: CreateArticleFavoriteDto): Promise<void> {
        const articleFavorite = await this.articleFavoriteService.createArticleFavorite(createArticleFavoriteDto);
    }

    // 즐겨찾기한 게시글 삭제
    @Delete('/:articleFavoriteID')
    async deletearticleFavorite(@Param('articleFavoriteID') articleFavoriteID: number): Promise<void> {
        await this.articleFavoriteService.deleteArticleFavorite(articleFavoriteID);
    }

}
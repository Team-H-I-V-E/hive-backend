import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleFavorite } from "../entities/articleFavorite.entity";
import { In, Repository } from "typeorm";
import { Article } from "src/article/entities/article.entity";
import { CreateArticleFavoriteDto } from "../dto/articleFavorite/create-articleFavorite.dto";

@Injectable()
export class ArticleFavoriteService {

    constructor(
        @InjectRepository(ArticleFavorite)
        private articleFavoriteRepository: Repository<ArticleFavorite>,
        @InjectRepository(Article)
        private articleRepository: Repository<Article>
    ) {}

    // 즐겨찾기한 게시글 Id 찾기
    async getArticleFavoriteId(articleFavoriteId: number): Promise<ArticleFavorite> {
        const foundArticleFavorite = await this. articleFavoriteRepository.findOneBy({ articleFavoriteId: articleFavoriteId });
        if (!foundArticleFavorite) {
            throw new NotFoundException(`Board with Id ${articleFavoriteId} not found`);
        }
        return foundArticleFavorite;
    }

    // 즐겨찾기한 게시글 모두 조회
    async getAllArticleFavorite(userId: number): Promise<Article[]> {
        const foundArticleFavorites = await this.articleFavoriteRepository.findBy({ userId: userId });
        if (!foundArticleFavorites) {
            return [];
        }
        const ArticleId = foundArticleFavorites.map(favorite => favorite.articleId);
        const foundArticles = await this.articleRepository.findBy({ articleId: In(ArticleId) });
        return foundArticles;
    }

    // 게시글 즐겨찾기 추가
    async createArticleFavorite(createArticleFavoriteDto: CreateArticleFavoriteDto): Promise<void> {
        const { articleId, userId } = createArticleFavoriteDto;
        const newArticleFavorite: ArticleFavorite = {
            articleFavoriteId: 0,
            articleId,
            userId
        }
        const createArticleFavorite = await this.articleFavoriteRepository.save(newArticleFavorite);
    }

    // 즐겨찾기한 게시글 삭제
    async deleteArticleFavorite(articleFavoriteId: number): Promise<void> {
        const foundArticleFavorite = await this.getArticleFavoriteId(articleFavoriteId);
        await this.articleFavoriteRepository.delete(foundArticleFavorite);
    }

}
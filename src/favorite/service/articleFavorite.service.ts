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

    // 즐겨찾기한 게시글 ID 찾기
    async getArticleFavoriteID(articleFavoriteID: number): Promise<ArticleFavorite> {
        const foundArticleFavorite = await this. articleFavoriteRepository.findOneBy({ articleFavoriteID: articleFavoriteID });
        if (!foundArticleFavorite) {
            throw new NotFoundException(`Board with ID ${articleFavoriteID} not found`);
        }
        return foundArticleFavorite;
    }

    // 즐겨찾기한 게시글 모두 조회
    async getAllArticleFavorite(userID: number): Promise<Article[]> {
        const foundArticleFavorites = await this.articleFavoriteRepository.findBy({ userID: userID });
        if (!foundArticleFavorites) {
            return [];
        }
        const ArticleID = foundArticleFavorites.map(favorite => favorite.articleID);
        const foundArticles = await this.articleRepository.findBy({ articleID: In(ArticleID) });
        return foundArticles;
    }

    // 게시글 즐겨찾기 추가
    async createArticleFavorite(createArticleFavoriteDto: CreateArticleFavoriteDto): Promise<void> {
        const { articleID, userID } = createArticleFavoriteDto;
        const newArticleFavorite: ArticleFavorite = {
            articleFavoriteID: 0,
            articleID,
            userID
        }
        const createArticleFavorite = await this.articleFavoriteRepository.save(newArticleFavorite);
    }

    // 즐겨찾기한 게시글 삭제
    async deleteArticleFavorite(articleFavoriteID: number): Promise<void> {
        const foundArticleFavorite = await this.getArticleFavoriteID(articleFavoriteID);
        await this.articleFavoriteRepository.delete(foundArticleFavorite);
    }

}
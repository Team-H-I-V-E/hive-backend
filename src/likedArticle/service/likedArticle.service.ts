import { Injectable, NotFoundException } from "@nestjs/common";
import { LikedArticle } from "../entities/likedArticle.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLikedArticleDto } from "../dto/create-likedArticle.dto";

@Injectable()
export class LikedArticleService {

    constructor(
            @InjectRepository(LikedArticle)
            private likedArticleRepository: Repository<LikedArticle>,
    ) {}

    // 좋아요 한 게시글 ID 찾기
    async getLikedArticleID(likedArticleID: number): Promise<LikedArticle> {
        const foundLikedArticle = await this. likedArticleRepository.findOneBy({ likedArticleID: likedArticleID });
        if (!foundLikedArticle) {
            throw new NotFoundException(`Board with ID ${likedArticleID} not found`);
        }
        return foundLikedArticle;
    }

    // 게시글 좋아요 추가
    async createLikedArticle(createlikedArticleDto: CreateLikedArticleDto): Promise<void> {
        const { articleID, userID } = createlikedArticleDto;
            const newArticleFavorite: LikedArticle = {
            likedArticleID: 0,
            articleID,
            userID
        }
        const createArticleFavorite = await this.likedArticleRepository.save(newArticleFavorite);
    }
    
    // 좋아요 한 게시글 삭제
    async deleteLikedArticle(likedArticleID: number): Promise<void> {
        const foundLikedArticle = await this.getLikedArticleID(likedArticleID);
        await this.likedArticleRepository.delete(foundLikedArticle);
    }

}
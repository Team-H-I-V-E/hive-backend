import { BadRequestException, Injectable } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { PanoramaFavorite } from "../entities/panoramaViewerFavorite.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PanoramaFavoriteService {
    constructor(
        @InjectRepository(PanoramaFavorite)
        private panoramaFavoriteRepository: Repository<PanoramaFavorite>
    ) {}

    async addPanoramaFavorite(panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto): Promise<void> {
        const {userID, panoramaViewerID, } = panoramaFavoriteRequestDto;
        if (!userID || !panoramaViewerID) {
            throw new BadRequestException('userID and panoramaViewerID contents must be provided');
        }
        const favorite = this.panoramaFavoriteRepository.create({
            panoramaFavoriteID: 0,
            userID,
            panoramaViewerID,
            panoramaFavoriteCreatedAt: new Date,
        });
        await this.panoramaFavoriteRepository.save(favorite);
    }

    async foundPanoramaFavoriteByID(panoramaFavoriteID: number): Promise<PanoramaFavorite> {
        const foundFavorite = await this.panoramaFavoriteRepository.findOneBy({ panoramaFavoriteID: panoramaFavoriteID });
        if (!foundFavorite) {
            throw new Error(`PanoramaFavorite with ID ${panoramaFavoriteID} not found.`);
        }
        return foundFavorite;
    }
    
    async deletePanoramaFavorite(panoramaFavoriteID: number): Promise<void> {
        const foundPanoramaFavorite = await this.foundPanoramaFavoriteByID(panoramaFavoriteID);
        await this.panoramaFavoriteRepository.remove(foundPanoramaFavorite)
    }

}
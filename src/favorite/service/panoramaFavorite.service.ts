import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PanoramaFavorite } from "../entities/panoramaFavorite.entity";

@Injectable()
export class PanoramaFavoriteService {
    constructor(
        @InjectRepository(PanoramaFavorite)
        private readonly panoramaFavoriteRepository: Repository<PanoramaFavorite>
    ) {}

    async addPanoramaFavorite(favorite: PanoramaFavoriteRequestDto): Promise<string> {
        try {
            await this.panoramaFavoriteRepository.save(favorite);
            return 'Panorama Favorite created successfully';
        } catch (error) {
            throw new InternalServerErrorException('Database query failed', error);
        }
    }

    async foundPanoramaFavoriteByID(panoramaFavoriteID: number): Promise<PanoramaFavorite> {
        const foundFavorite = await this.panoramaFavoriteRepository.findOne({
            where: { panoramaFavoriteID: panoramaFavoriteID },
        });
        if (!foundFavorite) {
            throw new NotFoundException(`PanoramaFavorite with ID ${panoramaFavoriteID} not found.`);
        }
        return foundFavorite;
    }
    
    async deletePanoramaFavorite(panoramaFavoriteID: number): Promise<void> {
        const foundPanoramaFavorite = await this.foundPanoramaFavoriteByID(panoramaFavoriteID);
        await this.panoramaFavoriteRepository.remove(foundPanoramaFavorite);
    }
}

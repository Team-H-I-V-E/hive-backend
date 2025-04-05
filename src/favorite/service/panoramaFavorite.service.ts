import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { PanoramaFavorite } from "../entities/panoramaFavorite.entity";
import { Panorama } from "src/panorama/entities/panorama.entity";

@Injectable()
export class PanoramaFavoriteService {
    constructor(
        @InjectRepository(PanoramaFavorite)
        private readonly panoramaFavoriteRepository: Repository<PanoramaFavorite>,
        @InjectRepository(Panorama)
        private readonly panoramaRepository: Repository<Panorama>
    ) { }

    async getAllPanoramaFavorite(userId: number): Promise<Panorama[]> {
        const foundFavorites = await this.panoramaFavoriteRepository.findBy({ userId });
    
        if (foundFavorites.length === 0) {
            return [];
        }
    
        const panoramaIds = foundFavorites.map(fav => fav.panoramaId); // ← 여긴 panoramaFavoriteId 말고 panoramaId겠죠?
        
        const panoramas = await this.panoramaRepository.findBy({
            panoramaId: In(panoramaIds),
        });
    
        return panoramas;
    }    

    async addPanoramaFavorite(favorite: PanoramaFavoriteRequestDto): Promise<string> {
        try {
            await this.panoramaFavoriteRepository.save(favorite);
            return 'Panorama Favorite created successfully';
        } catch (error) {
            throw new InternalServerErrorException('Database query failed', error);
        }
    }

    async foundPanoramaFavoriteById(panoramaFavoriteId: number): Promise<PanoramaFavorite> {
        const foundFavorite = await this.panoramaFavoriteRepository.findOne({
            where: { panoramaFavoriteId: panoramaFavoriteId },
        });
        if (!foundFavorite) {
            throw new NotFoundException(`PanoramaFavorite with Id ${panoramaFavoriteId} not found.`);
        }
        return foundFavorite;
    }

    async deletePanoramaFavorite(panoramaFavoriteId: number): Promise<void> {
        const foundPanoramaFavorite = await this.foundPanoramaFavoriteById(panoramaFavoriteId);
        await this.panoramaFavoriteRepository.remove(foundPanoramaFavorite);
    }
}

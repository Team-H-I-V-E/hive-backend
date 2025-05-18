import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { PanoramaFavorite } from "../entities/panoramaFavorite.entity";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
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
        const favorites = await this.panoramaFavoriteRepository.findBy({ userId });
        if (favorites.length === 0) return [];

        const panoramaIds = favorites.map(fav => fav.panoramaId);
        return await this.panoramaRepository.findBy({ panoramaId: In(panoramaIds) });
    }

    async addPanoramaFavorite(dto: PanoramaFavoriteRequestDto): Promise<void> {
        try {
            await this.panoramaFavoriteRepository.save(dto);
        } catch (error) {
            throw new InternalServerErrorException('Database insert failed', error);
        }
    }

    async deleteByUserAndPanorama(userId: number, panoramaId: number): Promise<void> {
        const favorite = await this.panoramaFavoriteRepository.findOneBy({ userId, panoramaId });
        if (!favorite) {
            throw new NotFoundException(`즐겨찾기 기록이 존재하지 않습니다.`);
        }

        await this.panoramaFavoriteRepository.remove(favorite);
    }
}

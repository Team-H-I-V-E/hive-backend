import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panorama } from '../entities/panorama.entity';
import { PanoramaResponseDto } from '../dto/panorama-response.dto';

@Injectable()
export class PanoramaService {
    constructor(
        @InjectRepository(Panorama)
        private panoramaRepository: Repository<Panorama>,
    ) { }

    async getAllPanorama(): Promise<PanoramaResponseDto[]> {
        const foundPanoramas = await this.panoramaRepository
            .createQueryBuilder('Panorama')
            .select([
                'Panorama.panoramaId',
                'Panorama.ruinsAge',
                'Panorama.panoramaLatitude',
                'Panorama.panoramaLongitude'
            ])
            .getRawMany(); // getRawMany() 사용하여 변환된 데이터 가져오기

        return foundPanoramas;
    }

    async getPanoramaDetail(panoramaId: number): Promise<Panorama> {
        const foundPanoramaDetail = await this.panoramaRepository
            .createQueryBuilder('panorama')
            .leftJoinAndSelect('panorama.panoramaImages', 'panoramaImages')
            .leftJoinAndSelect('panorama.miniMapPoints', 'miniMapPoints')
            .leftJoinAndSelect('miniMapPoints.targetPanoramaImage', 'targetPanoramaImage')
            .where('panorama.panoramaId = :id', { id: panoramaId })
            .getOne();

        if (!foundPanoramaDetail) {
            throw new NotFoundException(`Panorama with ID ${panoramaId} not found`);
        }

        return foundPanoramaDetail;
    }
}
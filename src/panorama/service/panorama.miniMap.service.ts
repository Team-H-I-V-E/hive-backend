import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiniMapPoint } from '../entities/miniMapPoint.entity';
import { PanoramaImage } from '../entities/panoramaImage.entity';

@Injectable()
export class MiniMapPointService {
    constructor(
        @InjectRepository(MiniMapPoint)
        private readonly miniMapPointRepository: Repository<MiniMapPoint>,
    ) { }

    async findTargetPanoramaImage(pointId: number): Promise<PanoramaImage> {
        const miniMapPoint = await this.miniMapPointRepository.findOne({
            where: { id: pointId },
            relations: ['targetPanoramaImage'],
        });

        if (!miniMapPoint) {
            throw new NotFoundException(`MiniMapPoint with ID ${pointId} not found`);
        }

        if (!miniMapPoint.targetPanoramaImage) {
            throw new NotFoundException('No linked PanoramaImage for this MiniMapPoint');
        }

        return miniMapPoint.targetPanoramaImage;
    }
}
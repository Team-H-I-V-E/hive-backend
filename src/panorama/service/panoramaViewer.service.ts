import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';
import { PanoramaViewerResponseDto } from '../dto/panoramaViewer-response.dto';

@Injectable()
export class PanoramaViewerService {
    constructor(
        @InjectRepository(PanoramaViewer)
        private panoramaViewerRepository: Repository<PanoramaViewer>,
    ) {}

    async getAllPanoramaViewers(): Promise<PanoramaViewerResponseDto[]> {
        const foundPanoramaViewers = await this.panoramaViewerRepository.find();
        return foundPanoramaViewers;
    }

    async getPanoramaDetail(panoramaViewerID: number): Promise<PanoramaViewer> {
        const foundPanoramaViewerDetail = await this.panoramaViewerRepository.findOneBy({panoramaViewerID: panoramaViewerID});
        if (!foundPanoramaViewerDetail) {
            throw new NotFoundException(`PanoramaViewer with ID ${panoramaViewerID} not found`);
        }
        return foundPanoramaViewerDetail;
    }
}

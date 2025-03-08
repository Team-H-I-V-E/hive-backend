import { Injectable } from '@nestjs/common';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';
import { PanoramaViewerRepository } from '../repository/panoramaViewer-repository';

@Injectable()
export class PanoramaViewerService {
    constructor(private panoramaViewerRepository: PanoramaViewerRepository) {}

    async getAllPanoramaViewers(): Promise<PanoramaViewer[]> {
        const foundPanoramaViewer = await this.panoramaViewerRepository.findAll();
        return foundPanoramaViewer;
    }

}
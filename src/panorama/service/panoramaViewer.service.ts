import { Get, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';

@Injectable()
export class PanoramaViewerService {
    constructor(
        @InjectRepository(PanoramaViewer)
        private panoramaViewerRepository: Repository<PanoramaViewer>,
    ) {}

    @Get()
    @UsePipes(ValidationPipe)
    async getAllPanoramaViewers(): Promise<PanoramaViewer[]> {
        const foundPanoramaViewers = await this.panoramaViewerRepository.find();
        return foundPanoramaViewers;
    }
}

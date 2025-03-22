import { Controller, Get, Param } from '@nestjs/common';
import { PanoramaViewerService } from '../service/panoramaViewer.service';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';
import { PanoramaViewerResponseDto } from '../dto/panoramaViewer-response.dto';

@Controller('api/panoramaViewers')
export class PanoramaViewerController {
    constructor(private panoramaViewerService: PanoramaViewerService) {}

    @Get('/')
    async getAllPanoramaViewers(): Promise<PanoramaViewerResponseDto[]> {
        return await this.panoramaViewerService.getAllPanoramaViewers();
    }

    @Get('/:panoramaViewerID')
    async getPanoramaViewerDetail(@Param('panoramaViewerID') panoramaViewerID: number): Promise<PanoramaViewer> {
        return await this.panoramaViewerService.getPanoramaDetail(panoramaViewerID);
    }
}
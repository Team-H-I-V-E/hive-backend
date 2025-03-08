import { Controller, Get } from '@nestjs/common';//auto import
import { PanoramaViewerService } from '../service/panoramaViewer.service';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';

@Controller('api/panoramaViewers')
export class PanoramaViewerController {
    constructor(private panoramaViewerService: PanoramaViewerService) {}

    @Get('/')
    async getAllPanoramaViewers(): Promise<PanoramaViewer[]> {
        return await this.panoramaViewerService.getAllPanoramaViewers();
    }
}
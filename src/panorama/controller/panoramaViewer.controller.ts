import { Controller, Get } from '@nestjs/common';//auto import
import { PanoramaViewerService } from '../service/panoramaViewer.service';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';

@Controller('api/panoramaViewers')
export class PanoramaViewerController {
    constructor(private panoramaViewerService: PanoramaViewerService) {}

    @Get('/')
    getAllPanoramaViewers(): PanoramaViewer[] {
        return this.panoramaViewerService.getAllPanoramaViewers();
    }

}
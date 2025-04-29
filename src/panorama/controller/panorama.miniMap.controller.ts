import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PanoramaImage } from '../entities/panoramaImage.entity';
import { MiniMapPointService } from '../service/panorama.miniMap.service';

@Controller('api/mini-map-point')
export class MiniMapPointController {
    constructor(private readonly miniMapPointService: MiniMapPointService) {}

    @Get('/:id/panorama-image')
    async getTargetPanoramaImage(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PanoramaImage> {
        return await this.miniMapPointService.findTargetPanoramaImage(id);
    }
}
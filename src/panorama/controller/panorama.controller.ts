import { Controller, Get, Param } from '@nestjs/common';
import { PanoramaService } from '../service/panorama.service';
import { Panorama } from '../entities/panorama.entity';
import { PanoramaResponseDto } from '../dto/panorama/panorama-response.dto';

@Controller('api/panorama')
export class PanoramaController {
    constructor(private panoramaService: PanoramaService) {}

    @Get('/')
    async getAllPanorama(): Promise<PanoramaResponseDto[]> {
        return await this.panoramaService.getAllPanorama();
    }

    @Get('/:panoramaId')
    async getPanoramaDetail(@Param('panoramaId') panoramaId: number): Promise<Panorama> {
        return await this.panoramaService.getPanoramaDetail(panoramaId);
    }
}
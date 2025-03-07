import { Body, Controller, Get, Post } from '@nestjs/common';//auto import
import { PanoramaViewerService } from '../service/panoramaViewer.service';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';
import { PanoramaFavoriteRequestDto } from '../dto/panoramaFavorite/panoramaFavorite-request.dto';

@Controller('api/panoramaViewers')
export class PanoramaViewerController {
    constructor(private panoramaViewerService: PanoramaViewerService) {}

    @Get('/')
    getAllPanoramaViewers(): PanoramaViewer[] {
        return this.panoramaViewerService.getAllPanoramaViewers();
    }

    @Post('/') // PostMapping 핸들러 데코레이터
    createBoard(@Body() panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto)  {
        return this.panoramaViewerService.addPanoramaFavorite(panoramaFavoriteRequestDto);
    }

}
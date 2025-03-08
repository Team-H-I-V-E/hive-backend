import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';//auto import
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

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto)  {
        return this.panoramaViewerService.addPanoramaFavorite(panoramaFavoriteRequestDto);
    }

    @Delete('/:panoramaFavoriteID')
    deleteBoardById(@Param('panoramaFavoriteID') panoramaFavoriteID: number): void{
        this.panoramaViewerService.deletePanoramaFavorite(panoramaFavoriteID);
    }

}
import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { PanoramaViewerFavoriteService } from "../service/panoramaViewerFavorite.service";

@Controller('api/panoramaViewerFavorite')
export class PanoramaViewerController {
    constructor(private panoramaViewerFavoriteService: PanoramaViewerFavoriteService) {}

    @Post('/')
    async createBoard(@Body() panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto): Promise<void>  {
        return this.panoramaViewerFavoriteService.addPanoramaFavorite(panoramaFavoriteRequestDto);
    }

    @Delete('/:panoramaFavoriteID')
    async deleteBoardById(@Param('panoramaFavoriteID') panoramaFavoriteID: number): Promise<void>{
        this.panoramaViewerFavoriteService.deletePanoramaFavorite(panoramaFavoriteID);
    }

}
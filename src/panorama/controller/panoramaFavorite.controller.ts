import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { PanoramaFavoriteService } from "../service/panoramaFavorite.service";

@Controller('api/panoramaViewerFavorite')
export class PanoramaViewerController {
    constructor(private panoramaViewerFavoriteService: PanoramaFavoriteService) {}

    @Post('/')
    async createBoard(@Body() panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto): Promise<string>  {
        return this.panoramaViewerFavoriteService.addPanoramaFavorite(panoramaFavoriteRequestDto);
    }

    @Delete('/:panoramaFavoriteID')
    async deleteBoardById(@Param('panoramaFavoriteID') panoramaFavoriteID: number): Promise<void>{
        this.panoramaViewerFavoriteService.deletePanoramaFavorite(panoramaFavoriteID);
    }

}
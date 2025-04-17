import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { PanoramaFavoriteService } from "../service/panoramaFavorite.service";
import { Panorama } from "src/panorama/entities/panorama.entity";

@Controller('api/panoramaFavorite')
export class PanoramaFavoriteController {

    constructor(private panoramaFavoriteService: PanoramaFavoriteService) {}

    @Get('/:userId')
    async getAllPanoramaFavorite(userId: number): Promise<Panorama[]> {
            const panorama: Panorama[] = await this.panoramaFavoriteService.getAllPanoramaFavorite(userId);
            return panorama;
        }

    @Post('/')
    async addPanoramaFavorite(@Body() panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto): Promise<void>  {
        this.panoramaFavoriteService.addPanoramaFavorite(panoramaFavoriteRequestDto);
    }

    @Delete('/:panoramaFavoriteId')
    async deletePanoramaFavorite(@Param('panoramaFavoriteId') panoramaFavoriteId: number): Promise<void>{
        this.panoramaFavoriteService.deletePanoramaFavorite(panoramaFavoriteId);
    }
}
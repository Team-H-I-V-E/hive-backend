import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PanoramaFavoriteRequestDto } from "../dto/panoramaFavorite/panoramaFavorite-request.dto";
import { PanoramaFavoriteService } from "../service/panoramaFavorite.service";
import { Panorama } from "src/panorama/entities/panorama.entity";

@Controller('api/panoramaFavorite')
export class PanoramaFavoriteController {
    constructor(private panoramaFavoriteService: PanoramaFavoriteService) { }

    @Get('/:userId')
    async getAllPanoramaFavorite(@Param('userId') userId: number): Promise<Panorama[]> {
        return this.panoramaFavoriteService.getAllPanoramaFavorite(userId);
    }

    @Post('/')
    async addPanoramaFavorite(
        @Body() panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto
    ): Promise<void> {
        return this.panoramaFavoriteService.addPanoramaFavorite(panoramaFavoriteRequestDto);
    }

    @Delete('/user/:userId/panorama/:panoramaId')
    async deleteByUserAndPanorama(
        @Param('userId') userId: number,
        @Param('panoramaId') panoramaId: number
    ): Promise<void> {
        return this.panoramaFavoriteService.deleteByUserAndPanorama(userId, panoramaId);
    }
}
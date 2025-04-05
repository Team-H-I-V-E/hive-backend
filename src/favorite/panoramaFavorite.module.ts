import { Module } from "@nestjs/common";
import { PanoramaFavoriteService } from "./service/panoramaFavorite.service";
import { PanoramaFavoriteController } from "./controller/panoramaFavorite.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanoramaFavorite } from "./entities/panoramaFavorite.entity";
import { Panorama } from "src/panorama/entities/panorama.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PanoramaFavorite,
            Panorama
        ]),
    ],
    controllers: [PanoramaFavoriteController],
    providers: [PanoramaFavoriteService],
})
export class PanoramaFavoriteModule {}
import { Module } from "@nestjs/common";
import { PanoramaFavoriteService } from "./service/panoramaFavorite.service";
import { PanoramaFavoriteController } from "./controller/panoramaFavorite.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanoramaFavorite } from "./entities/panoramaFavorite.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PanoramaFavorite])],
    controllers: [PanoramaFavoriteController],
    providers: [PanoramaFavoriteService],
})
export class PanoramaFavoriteModule {}
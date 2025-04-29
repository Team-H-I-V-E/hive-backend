import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniMapPoint } from './entities/miniMapPoint.entity';
import { PanoramaImage } from './entities/panoramaImage.entity';
import { MiniMapPointController } from './controller/panorama.miniMap.controller';
import { MiniMapPointService } from './service/panorama.miniMap.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MiniMapPoint,
            PanoramaImage,
        ])
    ],
    controllers: [
        MiniMapPointController,
    ],
    providers: [
        MiniMapPointService,
    ],
})
export class MiniMapPointModule { }
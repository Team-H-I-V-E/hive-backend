import { Module } from '@nestjs/common';
import { PanoramaViewerController } from './controller/panoramaViewer.controller';
import { PanoramaViewerService } from './service/panoramaViewer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanoramaViewer } from './entities/panoramaViewer.entity';
import { PanoramaFavorite } from './entities/panoramaViewerFavorite.entity';
import { PanoramaImage } from './entities/panoramaImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PanoramaImage,
      PanoramaViewer,
      PanoramaFavorite
    ])
  ],
  controllers: [
    PanoramaViewerController
  ],
  providers: [
    PanoramaViewerService,
  ],
})
export class PanoramaViewerModule {}
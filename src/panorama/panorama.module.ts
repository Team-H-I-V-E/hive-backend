import { Module } from '@nestjs/common';
import { PanoramaViewerController } from './controller/panoramaViewer.controller';
import { PanoramaViewerService } from './service/panoramaViewer.service';
import { PanoramaViewerRepository } from './repository/panoramaViewer-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanoramaViewer } from './entities/panoramaViewer.entity';
import { PanoramaFavorite } from './entities/panoramaViewerFavorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PanoramaViewer, PanoramaFavorite])
  ],
  controllers: [PanoramaViewerController],
  providers: [
    PanoramaViewerService, 
    PanoramaViewerRepository,
  ],
})
export class PanoramaViewerModule {}
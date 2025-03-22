import { Module } from '@nestjs/common';
import { PanoramaViewerController } from './controller/panoramaViewer.controller';
import { PanoramaViewerService } from './service/panoramaViewer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanoramaViewer } from './entities/panoramaViewer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PanoramaViewer,
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
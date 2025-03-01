import { Module } from '@nestjs/common';
import { PanoramaViewerController } from './controller/panoramaViewer.controller';
import { PanoramaViewerService } from './service/panoramaViewer.service';

@Module({
  controllers: [PanoramaViewerController],
  providers: [PanoramaViewerService],
})
export class PanoramaViewerModule {}
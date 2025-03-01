import { Module } from '@nestjs/common';
import { PanoramaViewerModule } from './panorama/panoramaImage.module';


@Module({
  imports: [PanoramaViewerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

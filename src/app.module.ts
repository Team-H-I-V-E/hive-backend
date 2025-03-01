import { Module } from '@nestjs/common';
import { PanoramaViewerModule } from './panorama/panorama.module';


@Module({
  imports: [PanoramaViewerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PanoramaController } from './controller/panorama.controller';
import { PanoramaService } from './service/panorama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panorama } from './entities/panorama.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Panorama,
    ])
  ],
  controllers: [
    PanoramaController
  ],
  providers: [
    PanoramaService,
  ],
})
export class PanoramaModule {}
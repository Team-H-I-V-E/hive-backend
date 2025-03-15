import { Module } from '@nestjs/common';
import { PanoramaViewerModule } from './panorama/panorama.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PanoramaViewerModule,
  ]
})
export class AppModule {}
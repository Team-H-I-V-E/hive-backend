import { Module } from '@nestjs/common';
import { PanoramaViewerModule } from './panorama/panorama.module';
import { databaseConfig } from './configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PanoramaViewerModule,
  ],
  controllers: [],
  providers: [
    {
      provide : 'DATABASE_CONFIG',
      useValue: databaseConfig
    },
  ],
  exports: ['DATABASE_CONFIG']
})
export class AppModule {}
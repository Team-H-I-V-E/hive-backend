import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeritageModule } from '../heritage/heritage.module'; 
import { Heritage3DModel } from './entities/heritage3dModel.entity';
import { Heritage } from './entities/heritage.entity';
import { Heritage3DModelService } from './service/heritage3dModel.service';
import { HeritageService } from './service/heritage.service';
import { Heritage3DModelController } from './controller/heritage.3dModel.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Heritage3DModel, Heritage]), 
    HeritageModule,
    HttpModule
  ],
  controllers: [Heritage3DModelController],

  providers: [Heritage3DModelService,HeritageService],
})
export class Heritage3DModelModule {}

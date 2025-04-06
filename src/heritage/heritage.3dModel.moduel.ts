import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeritageModule } from '../heritage/heritage.module'; 
import { Heritage3DModel } from './entities/heritage3dModel.entity';
import { Heritage } from './entities/heritage.entity';
import { Heritage3DModelService } from './service/heritage3dModel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Heritage3DModel, Heritage]), 
    HeritageModule,
  ],
  providers: [Heritage3DModelService],
  exports: [Heritage3DModelService],
})
export class Heritage3DModelModule {}

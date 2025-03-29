import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Heritage3DModelController } from './controller/heritage.3dModel.controller';
import { Heritage3DModelService } from './service/heritage3dModel.service';
import { Heritage3DModel } from './entities/heritage3dModel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Heritage3DModel]),ConfigModule ,HttpModule],
    controllers: [Heritage3DModelController],
    providers: [Heritage3DModelService],
})
export class Heritage3DModelModule {}

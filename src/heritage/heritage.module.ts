import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from './entities/heritage.entity';
import { HeritageController } from './controller/heritage.controller';
import { HeritageService } from './service/heritage.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([Heritage]),ConfigModule ,HttpModule],
    controllers: [HeritageController],
    providers: [HeritageService],
})
export class HeritageModule {}

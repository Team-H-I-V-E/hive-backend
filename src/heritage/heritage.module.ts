import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from './entities/heritage.entity';
import { HeritageController } from './controller/heritage.controller';
import { HeritageService } from './service/heritage.serivce';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([Heritage]), HttpModule],
    controllers: [HeritageController],
    providers: [HeritageService],
})
export class HeritageModule {}

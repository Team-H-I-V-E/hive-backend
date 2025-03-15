import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Heritage } from './entities/heritage.entity';
import { HeritageController } from './controller/heritage.controller';
import { HeritageService } from './service/heritage.serivce';

@Module({
    imports: [TypeOrmModule.forFeature([Heritage])],
    controllers: [HeritageController],
    providers: [HeritageService],
})
export class HeritageModule {}

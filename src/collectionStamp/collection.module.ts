import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectedStamp } from './entities/collectedStamp.entity';
import { Stamp } from 'src/arExplore/entities/stamp.entity';
import { CollectionStampController } from './controller/collectionStamp.controller';
import { CollectionStampService } from './service/collectionStamp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectedStamp, Stamp]),
  ],
  controllers: [CollectionStampController],
  providers:   [CollectionStampService],
})
export class CollectionStampModule {}

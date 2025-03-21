import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectedStamp } from '../entities/collectedStamp.entity';
import { AcquireStampDto } from '../dto/arExperience-request.dto';
import { Stamp } from '../entities/stamp.entity';
@Injectable()
export class ArExperienceService {
  constructor(
    @InjectRepository(CollectedStamp)
    private readonly collectedStampRepository: Repository<CollectedStamp>,
    
    @InjectRepository(Stamp)
    private readonly stampRepository: Repository<Stamp>,
  ) {}

  async getStamps(userId: number) {
    // 획득한 스탬프 목록 반환
    const collectedStamps = await this.collectedStampRepository.find({ where: { userID: userId } });

    // 획득한 스탬프가 없으면 빈 배열 반환
    if (collectedStamps.length === 0) {
      return [];
    }

    return collectedStamps.map(collectedStamp => ({
      userID: collectedStamp.userID,
      collectedStampID: collectedStamp.collectedStampID,
      stampID: collectedStamp.stampID,
      stampTime: collectedStamp.stampTime,
      isAcquired: true,
    }));
  }

  acquireStamp(acquireStampDto: AcquireStampDto) {
    // 스탬프 획득
    return { message: 'Stamp acquired', stampId: acquireStampDto.stampID };
  }
}
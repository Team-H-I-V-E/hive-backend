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

  async getUnacquiredStamps(userId: number) {
    // 전체 스탬프 목록 조회
    const allStamps = await this.stampRepository.find();

    // 사용자가 획득한 스탬프 목록 조회
    const collectedStamps = await this.collectedStampRepository.find({ where: { userID: userId } });
    const collectedStampIds = new Set(collectedStamps.map(stamp => stamp.stampID));

    // 전체 스탬프 목록에 대해 획득 여부를 설정
    const stampsWithStatus = allStamps.map(stamp => ({
      stampID: stamp.stampID,
      stampImage: stamp.stampImage,
      stampCoordinate: stamp.stampCoordinate,
      isAcquired: collectedStampIds.has(stamp.stampID),
    }));

    // 획득하지 않은 스탬프 필터링
    const unacquiredStamps = stampsWithStatus.filter(stamp => !stamp.isAcquired);
    return unacquiredStamps;
  }
  
  acquireStamp(acquireStampDto: AcquireStampDto) {
    // 스탬프 획득
    return { message: 'Stamp acquired', stampId: acquireStampDto.stampID };
  }
}
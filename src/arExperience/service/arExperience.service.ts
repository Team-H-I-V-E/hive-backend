import { BadRequestException, Injectable } from '@nestjs/common';
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
      stampLatitude: stamp.stampLatitude,
      stampLongitude: stamp.stampLongitude,
      isAcquired: collectedStampIds.has(stamp.stampID),
    }));

    // 획득하지 않은 스탬프 필터링
    const unacquiredStamps = stampsWithStatus.filter(stamp => !stamp.isAcquired);
    return unacquiredStamps;
  }
  
  async acquireStamp(acquireStampDto: AcquireStampDto) {
    const { userID, stampID, userLatitude, userLongitude } = acquireStampDto;

    // 사용자가 획득한 스탬프 목록 조회
    const collectedStamps = await this.getStamps(userID);
    const collectedStampIds = new Set(collectedStamps.map(stamp => stamp.stampID));

    // 이미 획득한 스탬프인지 확인
    if (collectedStampIds.has(stampID)) {
        throw new BadRequestException('Stamp has already been acquired');
    }

    // 특정 위치에 도착했는지 확인
    const stamp = await this.stampRepository.findOne({ where: { stampID: stampID } });
    if (!stamp) {
      throw new BadRequestException('Stamp not found');
    }

    // 위치 비교 로직
    const { stampLatitude, stampLongitude } = stamp;
    const distance = this.calculateDistance(
        { latitude: stampLatitude, longitude: stampLongitude },
        { latitude: userLatitude, longitude: userLongitude }  
    );
    if (distance > 3) {
        throw new BadRequestException('User is not close enough to acquire the stamp');
    }

    // 스탬프 획득 로직
    const newCollectedStamp = this.collectedStampRepository.create({
        userID: userID,
        stampID: stampID,
        stampTime: new Date(),
    });

    await this.collectedStampRepository.save(newCollectedStamp);

    return { message: 'Stamp acquired', stampId: stampID };
  }

  private calculateDistance(coord1: { latitude: number; longitude: number }, coord2: { latitude: number; longitude: number }): number {
    const toRadians = (degree: number) => degree * (Math.PI / 180);

    const R = 6371; // 지구의 반지름
    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLon = toRadians(coord2.longitude - coord1.longitude);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 두 지점 간의 거리
  }
}
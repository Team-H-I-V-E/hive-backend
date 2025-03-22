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
    const allStamps = await this.stampRepository.query(`
      SELECT 
        Stamp.stampID,
        Stamp.stampImage,
        ST_AsText(Stamp.stampCoordinate) AS stampCoordinate
      FROM stamp Stamp
    `);

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
  
  async acquireStamp(acquireStampDto: AcquireStampDto) {
    const { userID, stampID, stampCoordinate } = acquireStampDto;

    // 사용자가 획득한 스탬프 목록 조회
    const collectedStamps = await this.getStamps(userID);
    const collectedStampIds = new Set(collectedStamps.map(stamp => stamp.stampID));

    // 이미 획득한 스탬프인지 확인
    if (collectedStampIds.has(stampID)) {
        throw new BadRequestException('Stamp has already been acquired');
    }

    // 특정 위치에 도착했는지 확인
    const stamp = await this.stampRepository.query(`
        SELECT 
            Stamp.stampID,
            Stamp.stampImage,
            ST_AsText(Stamp.stampCoordinate) AS stampCoordinate
        FROM stamp Stamp
        WHERE Stamp.stampID = ?
    `, [stampID]);

    if (!stamp || stamp.length === 0) {
        throw new BadRequestException('Stamp not found');
    }

    // 위치 비교 로직
    const distance = this.calculateDistance(stamp[0].stampCoordinate, stampCoordinate);
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


  private calculateDistance(coord1: string, coord2: string): number {
    return 4; // 예시 데이터
  }
}
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectedStamp } from '../entities/collectedStamp.entity';
import { AcquireStampDto } from '../dto/acquire-stamp.dto';
import { Stamp } from '../entities/stamp.entity';
import { StampDto } from '../dto/stamp.dto';

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
    return collectedStamps.length > 0 ? collectedStamps : [];
  }

  async getUnacquiredStamps(userId: number): Promise<StampDto[]> {
    const allStamps = await this.stampRepository.find();
    const collectedStamps = await this.collectedStampRepository.find({ where: { userID: userId } });
    const collectedStampIds = new Set(collectedStamps.map(stamp => stamp.stampID));
  
    const unacquired = allStamps.filter(stamp => !collectedStampIds.has(stamp.stampID));
  
    return unacquired.map(stamp => {
      const stampDto = new StampDto();
      stampDto.stampID = stamp.stampID;
      stampDto.stampLatitude = Number(stamp.stampLatitude);
      stampDto.stampLongitude = Number(stamp.stampLongitude);
      stampDto.stampImage = stamp.stampImage;
      
      return stampDto;
    });
  }
  
  async acquireStamp(acquireStampDto: AcquireStampDto) {
    const { userID, stampID } = acquireStampDto;

    // 이미 획득한 스탬프인지 확인
    const existingStamp = await this.collectedStampRepository.findOne({ where: { userID, stampID } });
    if (existingStamp) {
        throw new BadRequestException('Stamp has already been acquired');
    }

    // 존재하는 스탬프인지 확인
    const stamp = await this.stampRepository.findOne({ where: { stampID } });
    if (!stamp) {
      throw new BadRequestException('Stamp not found');
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
}
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectedStamp } from '../entities/collectedStamp.entity';
import { AcquireStampDto } from '../dto/acquire-stamp.dto';
import { Stamp } from '../entities/stamp.entity';
import { StampDto } from '../dto/stamp.dto';
import axios from 'axios';
import { parseString, Builder } from "xml2js";

@Injectable()
export class ArExploreService {
  private readonly API_URL = 'https://www.khs.go.kr/cha/SearchKindOpenapiDt.do';

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
      stampDto.stampName = stamp.stampName;
      stampDto.stampLatitude = Number(stamp.stampLatitude);
      stampDto.stampLongitude = Number(stamp.stampLongitude);
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

    // 획득한 스탬프의 상세 정보를 반환
    const stampDto = new StampDto();
    stampDto.stampID = stamp.stampID;
    stampDto.stampName = stamp.stampName;
    stampDto.stampPeriod = stamp.stampPeriod;
    stampDto.stampDescription = stamp.stampDescription;
    stampDto.stampLocation = stamp.stampLocation;
    stampDto.stampLatitude = Number(stamp.stampLatitude);
    stampDto.stampLongitude = Number(stamp.stampLongitude);
    stampDto.stampImage = stamp.stampImage;

    return {
      message: 'Stamp acquired',
      stampId: stampID,
      stampDetails: stampDto,
    };
  }

  async fetchAndParseData() {
    try {
      const ccbaCpnos = ['1124521190000', '1483301380000', '2114500010000', '2334500010000', '2334500060000', '2334500070000', '2334500100000'];
    
      const responses = await Promise.all(
        ccbaCpnos.map(ccbaCpno => 
          axios.get(`${this.API_URL}?&ccbaCpno=${ccbaCpno}`, { headers: { 'Content-Type': 'application/xml' } })
            .then(response => ({ response, ccbaCpno }))
        )
      );
      
      for (const { response, ccbaCpno } of responses) {
        const jsonData = await this.toJson(response.data);
      // console.log('Converted JSON:', jsonData);

        const stampData = Array.isArray(jsonData.result.item) ? jsonData.result.item : [jsonData.result.item];
    
        if (stampData.length > 0) {
          for (const item of stampData) {
            const stampName = this.cleanString(item.ccbaMnm1 || '미상');
            const stampPeriod = this.cleanString(item.ccceName || '미상');
            const stampDescription = this.cleanString(item.content || '설명 없음');
            const stampLocation = this.cleanString(item.ccbaLcad || '위치 정보 없음');
            
            const newStamp = this.stampRepository.create({
              stampNum: ccbaCpno,
              stampName: stampName,
              stampPeriod: stampPeriod,
              stampDescription: stampDescription,
              stampLocation: stampLocation,
              stampLatitude: item.latitude || 0,
              stampLongitude: item.longitude || 0,
              stampImage: item.imageUrl || null,
            });
    
            await this.stampRepository.save(newStamp);
          }
        } else {
          console.error('No valid items found in the response data for ccbaCpno:', ccbaCpno);
        }
      }
    
    } catch (error) {
      console.error('Error fetching and parsing data:', error.message);
    }
  }

  private toJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, { explicitArray: false }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  private cleanString(input: string): string {
    return input.replace(/[\r\n\t\s]+/g, ' ').trim();
  }
}

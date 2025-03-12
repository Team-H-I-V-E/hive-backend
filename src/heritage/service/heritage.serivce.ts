import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Heritage } from '../entities/heritage.entity';
import { CreateHeritageDto } from '../dto/heritage/create-heritage.dto';
import { UpdateHeritageDto } from '../dto/heritage/update-heritage.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HeritageService {
    private readonly API_URL = 'http://api.odcloud.kr/api/3074728/v1/uddi:6efbfe67-cc4c-4e68-8976-c176918e05bb_201912300950';
    private readonly API_KEY: string;

    constructor(
        @InjectRepository(Heritage)
        private readonly heritageRepository: Repository<Heritage>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.API_KEY = this.configService.get<string>('API_KEY') ?? ''; // 기본값 설정
        if (!this.API_KEY) {
            throw new Error('.env 파일을 확인하세요.');
    }
    }
    // 유물 데이터 가져오기 및 저장
    async fetchHeritageData(): Promise<void> {
        try {
            const url = `${this.API_URL}?page=1&perPage=1000&serviceKey=${this.API_KEY}`;
            const response = await this.httpService.axiosRef.get(url);

            console.log('API 응답 데이터:', response.data);

            if (!response.data || typeof response.data !== 'object') {
                throw new Error('API 응답이 올바르지 않습니다. (데이터 없음)');
            }

            const data = response.data.data; // API 응답 구조에서 'data' 필드 사용

            if (!data || !Array.isArray(data)) {
                throw new Error('API 응답 데이터가 올바르지 않습니다. (data 배열 없음)');
            }

            const heritageList: CreateHeritageDto[] = data.map((item) => ({
                heritageName: item['명칭'] || '미상',
                heritageDescription: item['연혁 및 내용'] || '설명 없음',
                heritageYear: item['시기'] || null,
                heritageLocation: item['도로명주소'] || '위치 정보 없음',
                heritageLatitude: item.latitude || 0,
                heritageLongitude: item.longitude || 0,
            }));

            await this.heritageRepository.save(heritageList);
            console.log('유물 데이터가 저장되었습니다');
        } catch (error) {
            console.error('Open API 호출을 실패했습니다:', error.response?.data || error.message);
        }
    }

    //유물 생성
    async createHeritage(createHeritageDto: CreateHeritageDto): Promise<Heritage> {
        const heritage = this.heritageRepository.create(createHeritageDto);
        return this.heritageRepository.save(heritage);
    }

    //유물 업데이트
    async updateHeritage(id: number, updateHeritageDto: UpdateHeritageDto): Promise<Heritage> {
        await this.heritageRepository.update(id, updateHeritageDto);
        const updatedHeritage = await this.getHeritageById(id);
        if (!updatedHeritage) {
            throw new NotFoundException(`Heritage with ID ${id} not found during update`);
        }
        return updatedHeritage;
    }

    //유물 삭제 
    async deleteHeritage(id: number): Promise<void> {
        const heritage = await this.getHeritageById(id);
        if (!heritage) {
            throw new NotFoundException(`Heritage with ID ${id} not found`);
        }
        await this.heritageRepository.delete(id);
    }

    //유물 전체 조회
    async getHeritageList(): Promise<Heritage[]> {
        return this.heritageRepository.find();
    }

    //유물 특정 조회
    async getHeritageById(id: number): Promise<Heritage | null> {
        return this.heritageRepository.findOne({ where: { heritageId: id } });
    }
}

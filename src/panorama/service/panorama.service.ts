import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panorama } from '../entities/panorama.entity';
import { PanoramaResponseDto } from '../dto/panorama-response.dto';
import axios from 'axios';
import { parseString } from "xml2js";

@Injectable()
export class PanoramaService {

    private readonly API_URL = 'https://www.khs.go.kr/cha/SearchKindOpenapiDt.do';

    private readonly panoramaCoordinates: { [key: string]: { latitude: number; longitude: number } } = {
        '1483301380000': { latitude: 36.53389000, longitude: 127.36528000 }, // 홍판서댁
        '2334500010000': { latitude: 36.68110000, longitude: 127.19520000 }, // 운주산성
        '2334500060000': { latitude: 36.55870000, longitude: 127.28150000 }, // 연기향교
        '2334500070000': { latitude: 36.68056000, longitude: 127.19972000 }, // 전의 향교
        '2334500100000': { latitude: 36.67200000, longitude: 127.23000000 }, // 전동 박안생 묘
        '2334500090000': { latitude: 36.53139000, longitude: 127.37611000 }, // 부강 남성골 산성
    };

    constructor(
        @InjectRepository(Panorama)
        private panoramaRepository: Repository<Panorama>,
    ) { }

    async getAllPanorama(): Promise<PanoramaResponseDto[]> {
        const foundPanoramas = await this.panoramaRepository
            .createQueryBuilder('Panorama')
            .select([
                'Panorama.panoramaId',
                'Panorama.ruinsAge',
                'Panorama.panoramaLatitude',
                'Panorama.panoramaLongitude'
            ])
            .getRawMany(); // getRawMany() 사용하여 변환된 데이터 가져오기

        return foundPanoramas;
    }

    async getPanoramaDetail(panoramaId: number): Promise<Panorama> {
        const foundPanoramaDetail = await this.panoramaRepository
            .createQueryBuilder('panorama')
            .leftJoinAndSelect('panorama.panoramaImages', 'panoramaImages')
            .leftJoinAndSelect('panorama.miniMapPoints', 'miniMapPoints')
            .leftJoinAndSelect('miniMapPoints.targetPanoramaImage', 'targetPanoramaImage')
            .where('panorama.panoramaId = :id', { id: panoramaId })
            .getOne();

        if (!foundPanoramaDetail) {
            throw new NotFoundException(`Panorama with ID ${panoramaId} not found`);
        }

        return foundPanoramaDetail;
    }

    async fetchAndParseData() {
        try {
            const ccbaCpnos = ['1483301380000', '2334500010000', '2334500060000', '2334500070000', '2334500100000', '2334500090000'];

            const responses = await Promise.all(
                ccbaCpnos.map(ccbaCpno =>
                    axios.get(`${this.API_URL}?&ccbaCpno=${ccbaCpno}`, {
                        headers: { 'Content-Type': 'application/xml' },
                    }).then(response => ({ response, ccbaCpno }))
                )
            );

            for (const { response, ccbaCpno } of responses) {
                const jsonData = await this.toJson(response.data);

                const panoramaData = Array.isArray(jsonData.result.item) ? jsonData.result.item : [jsonData.result.item];

                if (panoramaData.length > 0) {
                    for (const item of panoramaData) {
                        const ruinsName = this.cleanString(item.ccbaMnm1 || '미상');
                        const ruinsInformation = this.cleanString(item.content || '설명 없음');
                        const ruinsLocation = this.cleanString(item.ccbaLcad || '위치 정보 없음');
                        const ruinsImage = this.cleanString(item.imageUrl || '');
                        const ruinsNumber = this.cleanString(item.ccbaQuan || '');
                        const ruinsDay = this.cleanString(item.ccbaAsdt || '');

                        const { latitude: panoramaLatitude, longitude: panoramaLongitude } = this.panoramaCoordinates[ccbaCpno] || { latitude: 0, longitude: 0 };

                        const newPanorama = this.panoramaRepository.create({
                            ruinsName,
                            ruinsInformation,
                            ruinsLocation,
                            panoramaLatitude,
                            panoramaLongitude,
                            ruinsImage,
                            ruinsNumber,
                            ruinsDay
                        });

                        await this.panoramaRepository.save(newPanorama);
                    }
                } else {
                    console.error('No valid items found for ccbaCpno:', ccbaCpno);
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
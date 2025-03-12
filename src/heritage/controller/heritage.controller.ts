import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, Query } from '@nestjs/common';
import { HeritageService } from '../service/heritage.serivce';
import { CreateHeritageDto } from '../dto/heritage/create-heritage.dto';
import { Heritage } from '../entities/heritage.entity';
import { UpdateHeritageDto } from '../dto/heritage/update-heritage.dto.';


@Controller('api/heritages')
export class HeritageController {
    constructor(private readonly heritageService: HeritageService) { }

    //유물 생성
    @Post()
    async createHeritage(@Body() createHeritageDto: CreateHeritageDto): Promise<Heritage> {
        return this.heritageService.createHeritage(createHeritageDto);
    }

    //유물 전체 조회
    @Get()
    async getHeritageList(): Promise<Heritage[]> {
        return this.heritageService.getHeritageList();
    }

    //유물 특정 조회  
    @Get(':id')
    async getHeritageById(@Param('id') id: number): Promise<Heritage> {
        const heritage = await this.heritageService.getHeritageById(id);
        if (!heritage) {
            throw new NotFoundException(`Heritage with ID ${id} not found`);
        }
        return heritage;
    }

    //유물 업데이트 
    @Patch(':id')
    async updateHeritage(@Param('id') id: number, @Body() updateHeritageDto: UpdateHeritageDto): Promise<Heritage> {
        return this.heritageService.updateHeritage(id, updateHeritageDto);
    }

    //유물 삭제 
    @Delete(':id')
    async deleteHeritage(@Param('id') id: number): Promise<void> {
        return this.heritageService.deleteHeritage(id);
    }

    //유물 데이터 확인
    @Post('fetch')
    async fetchHeritageData() {
        await this.heritageService.fetchHeritageData();
        return { message: '세종시 유물 데이터 가져오기를 완료 했습니다' };
    }

}

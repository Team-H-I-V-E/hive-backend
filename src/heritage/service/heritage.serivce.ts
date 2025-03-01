import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Heritage } from '../entities/heritage.entity';
import { CreateHeritageDto } from '../dto/heritage/create-heritage.dto';
import { UpdateHeritageDto } from '../dto/heritage/update-heritage.dto.';

@Injectable()
export class HeritageService {
    constructor(
        @InjectRepository(Heritage)
        private readonly heritageRepository: Repository<Heritage>,
    ) {}

    //유물 생성
    async createHeritage(createHeritageDto: CreateHeritageDto): Promise<Heritage> {
        const heritage = this.heritageRepository.create(createHeritageDto);
        return this.heritageRepository.save(heritage);
    }

    async findAll(): Promise<Heritage[]> {
        return this.heritageRepository.find();
    }

    async findOne(id: number): Promise<Heritage | null> {
        return this.heritageRepository.findOneBy({ heritageId: id });
    }

    //유물 업데이트
    async updateHeritage(
        id: number, 
        updateHeritageDto: UpdateHeritageDto
    ): Promise<Heritage> {      
        await this.heritageRepository.update(id, updateHeritageDto);
        const updatedHeritage = await this.findOne(id);
        if (!updatedHeritage) {
            throw new NotFoundException(`Heritage with ID ${id} not found during update`);
        }
        return updatedHeritage;
    }

    //유물 삭제  
    async deleteHeritage(id: number): Promise<void> {
        const heritage = await this.findOne(id);
        if (!heritage) {
            throw new NotFoundException(`Heritage with ID ${id} not found`);
        }
        await this.heritageRepository.delete(id);
    }
}

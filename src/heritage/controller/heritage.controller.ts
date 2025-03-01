import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, Query } from '@nestjs/common';
import { HeritageService } from '../service/heritage.serivce';
import { CreateHeritageDto } from '../dto/heritage/create-heritage.dto';
import { Heritage } from '../entities/heritage.entity';
import { UpdateHeritageDto } from '../dto/heritage/update-heritage.dto.';


@Controller('api/heritages')
export class HeritageController {
    constructor(private readonly heritageService: HeritageService) { }

    @Post()
    async createHeritage(@Body() createHeritageDto: CreateHeritageDto): Promise<Heritage> {
        return this.heritageService.createHeritage(createHeritageDto);
    }

    @Get()
    async findAll(): Promise<Heritage[]> {
        return this.heritageService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Heritage> {
        const heritage = await this.heritageService.findOne(id);
        if (!heritage) {
            throw new NotFoundException(`Heritage with ID ${id} not found`);
        }
        return heritage;
    }
    
    @Patch(':id')
    async updateHeritage(@Param('id') id: number, @Body() updateHeritageDto: UpdateHeritageDto): Promise<Heritage> {
        return this.heritageService.updateHeritage(id, updateHeritageDto);
    }

    @Delete(':id')
    async deleteHeritage(@Param('id') id: number): Promise<void> {
        return this.heritageService.deleteHeritage(id);
    }

    
}

import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateHeritageDto } from '../dto/heritage/create-heritage.dto';
import { Heritage } from '../entities/heritage.entity';
import { UpdateHeritageDto } from '../dto/heritage/update-heritage.dto';
import { HeritageService } from '../service/heritage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


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

    //유물 좌표 업데이트
    @Post('update-coordinates')
    async updateCoordinates() {
        await this.heritageService.updateCoordinates();
        return { message: '모든 유적지의 좌표 변환이 완료되었습니다.' };
    }

    @Post(':id/upload-image')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/images',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `heritage-${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async uploadImage(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<{ imageUrl: string }> {
        const imageUrl = `/images/${file.filename}`;
        await this.heritageService.updateHeritage(id, { heritageImageUrl: imageUrl });
        return { imageUrl };
    }
}

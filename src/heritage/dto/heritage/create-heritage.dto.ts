import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateHeritageDto {
    @IsOptional()
    @IsNumber()
    heritageStoryId?: number;

    @IsOptional()
    @IsNumber()
    heritageModelId?: number;
    
    @IsString()
    heritageName: string;

    @IsString()
    heritageDescription: string;

    @IsOptional()
    @IsString()
    heritageYear?: string;

    @IsString()
    heritageLocation: string;

    @IsOptional()
    @IsNumber()
    heritageLatitude?: number;

    @IsOptional()
    @IsNumber()
    heritageLongitude?: number;
}

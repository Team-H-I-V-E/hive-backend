import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateHeritageDto {
    @IsOptional()
    @IsNumber()
    heritageStoryId?: number;

    @IsOptional()
    @IsNumber()
    heritageModelId?: number;

    @IsOptional()
    @IsString()
    heritageName?: string;

    @IsOptional()
    @IsString()
    heritageDescription?: string;

    @IsOptional()
    @IsString()
    heritageYear?: string;

    @IsOptional()
    @IsString()
    heritageLocation?: string;

    @IsOptional()
    @IsNumber()
    heritageLatitude?: number;

    @IsOptional()
    @IsNumber()
    heritageLongitude?: number;

    @IsOptional()
    @IsString()
    heritageImageUrl?: string;
  
}

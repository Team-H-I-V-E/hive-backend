import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateHeritageDto {
    @IsOptional()
    @IsNumber()
    heritageStoryId?: number;

    @IsOptional()
    @IsNumber()
    heritageModelId?: number;

    @IsOptional()
    @IsNumber()
    heritage3dModelId?: number;

    @IsOptional()
    @IsString()
    heritageName?: string;

    @IsOptional()
    @IsString()
    heritageDescription?: string;

    @IsOptional()
    @IsNumber()
    heritageYear?: number;

    @IsOptional()
    @IsString()
    heritageLocation?: string;

    @IsOptional()
    @IsString()
    heritageCoordinate?: string;
}

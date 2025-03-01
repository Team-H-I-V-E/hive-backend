import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHeritageDto {
    @IsNotEmpty()
    @IsNumber()
    heritageStoryId: number;

    @IsNotEmpty()
    @IsNumber()
    heritageModelId: number;

    @IsNotEmpty()
    @IsNumber()
    heritage3dModelId: number;
    
    @IsNotEmpty()
    @IsString()
    heritageName: string;

    @IsNotEmpty()
    @IsString()
    heritageDescription: string;

    @IsNotEmpty()
    @IsNumber()
    heritageYear: number;

    @IsNotEmpty()
    @IsString()
    heritageLocation: string;

    @IsNotEmpty()
    @IsString()
    heritageCoordinate: string;
}

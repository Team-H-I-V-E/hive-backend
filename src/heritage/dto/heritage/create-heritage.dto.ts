import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

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
  heritageType: string;      // 유형

  @IsString()
  heritageYear: string;      // 시대

  @IsString()
  heritageCategory: string;  // 분류

  @IsString()
  heritagePeriodArea: string; // 면적

  @IsOptional()
  @IsDateString()
  designationDate?: string;  // 지정일 (ISO 8601 문자열)

  @IsString()
  heritageLocation: string;

  @IsString()
  heritageDescription: string;

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

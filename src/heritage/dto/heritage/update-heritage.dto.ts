import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

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
  heritageType?: string;

  @IsOptional()
  @IsString()
  heritageYear?: string;

  @IsOptional()
  @IsString()
  heritageCategory?: string;

  @IsOptional()
  @IsString()
  heritagePeriodArea?: string;

  @IsOptional()
  @IsDateString()
  designationDate?: string;

  @IsOptional()
  @IsString()
  heritageLocation?: string;

  @IsOptional()
  @IsString()
  heritageDescription?: string;

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

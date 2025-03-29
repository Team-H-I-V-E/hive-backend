import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Create3dFileRequestDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(()=> Number)
    heritageId: number;

    @IsNotEmpty()
    file: Express.Multer.File;
}
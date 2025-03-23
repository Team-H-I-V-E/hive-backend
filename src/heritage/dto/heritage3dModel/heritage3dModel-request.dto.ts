import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Heritage3dModelRequestDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(()=> Number)
    heritageId: number;

    @IsNotEmpty()
    file: Express.Multer.File;
}
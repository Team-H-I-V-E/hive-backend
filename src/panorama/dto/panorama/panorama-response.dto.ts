import { IsNotEmpty } from "class-validator";

export class PanoramaResponseDto {
        @IsNotEmpty()
        panoramaId: number;

        @IsNotEmpty()
        ruinsAge: string;

        @IsNotEmpty()
        panoramaLatitude: number;

        @IsNotEmpty()
        panoramaLongitude: number;
}
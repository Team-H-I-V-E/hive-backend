import { IsNotEmpty } from "class-validator";
import { Point } from "typeorm";

export class PanoramaViewerResponseDto {
        @IsNotEmpty()
        panoramaViewerID: number;

        @IsNotEmpty()
        ruinsName: string;

        @IsNotEmpty()
        ruinsAge: string;

        @IsNotEmpty()
        ruinsLocation: string;

        @IsNotEmpty()
        ruinsInformation: string;

        @IsNotEmpty()
        panoramaViewerImageID: number;

        @IsNotEmpty()
        panoramaViewerCoordinate: Point;
}
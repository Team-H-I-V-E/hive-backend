import { IsNotEmpty } from "class-validator";
import { Point } from "typeorm";

export class PanoramaViewerResponseDto {
        @IsNotEmpty()
        panoramaViewerID: number;

        @IsNotEmpty()
        panoramaViewerCoordinate: Point;
}
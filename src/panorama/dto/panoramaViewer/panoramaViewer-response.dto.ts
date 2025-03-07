import { Point } from "typeorm";

export class PanoramaViewerResponseDto {
        panoramaViewerID: number;
        ruinsName: string;
        ruinsAge: string;
        ruinsLocation: string;
        ruinsInformation: string;
        panoramaViewerImageID: number;
        panoramaViewerCoordinate: Point;
}
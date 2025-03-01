import { Point } from "typeorm";

export class panoramaViewer {
    panoramaViewerID: number;
    ruinsName: string;
    ruinsAge: string;
    ruinsLocation: string;
    ruinsInformation: string;
    panoramaViewerImageID: number;
    panoramaViewerCoordinate: Point;
}
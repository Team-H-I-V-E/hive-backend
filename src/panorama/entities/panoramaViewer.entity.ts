import { Column, Point, PrimaryGeneratedColumn } from "typeorm";

export class PanoramaViewer {
    @PrimaryGeneratedColumn()
    panoramaViewerID: number;

    @Column()
    ruinsName: string;

    @Column()
    ruinsAge: string;

    @Column()
    ruinsLocation: string;

    @Column()
    ruinsInformation: string;

    @Column()
    panoramaViewerImageID: number;

    @Column()
    panoramaViewerCoordinate: Point;
}
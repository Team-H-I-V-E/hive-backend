import { Column, Entity, Point, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
    panoramaViewerImage: string;

    @Column("point")
    panoramaViewerCoordinate: Point;
}
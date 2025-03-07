import { Column, PrimaryGeneratedColumn } from "typeorm";

export class PanoramaViewerImage {
     @PrimaryGeneratedColumn()
    panoramaViewerImageID: number;

    @Column()
    panoramaViewerImage: Buffer;
}
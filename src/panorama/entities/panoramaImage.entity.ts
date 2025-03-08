import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PanoramaViewerImage {
    @PrimaryGeneratedColumn()
    panoramaViewerImageID: number;

    @Column()
    panoramaViewerImage: Buffer;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('panoramaimage')
export class PanoramaImage {
    @PrimaryGeneratedColumn()
    panoramaViewerImageID: number;

    @Column()
    panoramaViewerImage: Buffer;
}
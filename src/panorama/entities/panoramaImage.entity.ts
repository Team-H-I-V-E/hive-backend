import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PanoramaImage {
    @PrimaryGeneratedColumn()
    panoramaViewerImageID: number;

    @Column()
    panoramaViewerImage: Buffer;
}
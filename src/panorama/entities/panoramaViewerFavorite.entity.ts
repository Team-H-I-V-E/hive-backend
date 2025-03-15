import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PanoramaViewer } from "./panoramaViewer.entity";

@Entity('panoramafavorite')
export class PanoramaFavorite {
    @PrimaryGeneratedColumn()
    panoramaFavoriteID: number;

    @Column()
    userID: number;

    @Column()
    panoramaViewerID: number;

    @Column({  type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    panoramaFavoriteCreatedAt: Date;
}
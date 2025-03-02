import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    panoramaFavoriteID: number;

    @Column()
    userID: number;

    @Column()
    panoramaViewerID: number;

    @Column({  type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    panoramaFavoriteCreatedAt: Date;
}
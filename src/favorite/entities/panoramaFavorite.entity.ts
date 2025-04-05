import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PanoramaFavorite {

    @PrimaryGeneratedColumn()
    panoramaFavoriteId: number;

    @Column()
    userId: number;

    @Column()
    panoramaId: number;

    @Column({  type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    panoramaFavoriteCreatedAt: Date;
    
}
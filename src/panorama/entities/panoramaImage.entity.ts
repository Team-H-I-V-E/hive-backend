import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Panorama } from './panorama.entity';
import { MiniMapPoint } from './miniMapPoint.entity';

@Entity()
export class PanoramaImage {
    @PrimaryGeneratedColumn()
    panoramaImageId: number;

    @ManyToOne(() => Panorama, panorama => panorama.panoramaImages, { onDelete: 'CASCADE' })
    panorama: Panorama;

    @Column()
    imageUrl: string;

    @OneToOne(() => MiniMapPoint, miniMapPoint => miniMapPoint.targetPanoramaImage)
    miniMapPoint: MiniMapPoint;
}
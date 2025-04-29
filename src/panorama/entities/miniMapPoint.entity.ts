import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Panorama } from './panorama.entity';
import { PanoramaImage } from './panoramaImage.entity';

@Entity()
export class MiniMapPoint {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Panorama, panorama => panorama.miniMapPoints, { onDelete: 'CASCADE' })
    panorama: Panorama;

    @Column('float')
    x: number;

    @Column('float')
    y: number;

    @OneToOne(() => PanoramaImage, { eager: true })
    @JoinColumn()
    targetPanoramaImage: PanoramaImage;
}
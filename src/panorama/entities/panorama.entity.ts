import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PanoramaImage } from './panoramaImage.entity';
import { MiniMapPoint } from './miniMapPoint.entity';

@Entity()
export class Panorama {
    @PrimaryGeneratedColumn()
    panoramaId: number;

    @Column()
    ruinsName: string;

    @Column()
    ruinsAge: string;

    @Column()
    ruinsLocation: string;

    @Column()
    ruinsInformation: string;

    @OneToMany(() => PanoramaImage, panoramaImage => panoramaImage.panorama)
    panoramaImages: PanoramaImage[];

    @OneToMany(() => MiniMapPoint, miniMapPoint => miniMapPoint.panorama)
    miniMapPoints: MiniMapPoint[];

    @Column({ type: 'decimal', precision: 10, scale: 8 })
    panoramaLatitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    panoramaLongitude: number;

    @Column({ nullable: true })
    minimapImage: string;
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PanoramaImage } from './panoramaImage.entity';
import { MiniMapPoint } from './miniMapPoint.entity';

@Entity()
export class Panorama {
    @PrimaryGeneratedColumn()
    panoramaId: number;

    @Column({ nullable: true, type: 'text' })
    ruinsImage: string | null;

    @Column()
    ruinsName: string;

    @Column({ nullable: true })
    ruinsAge: string;

    @Column()
    ruinsLocation: string;

    @Column({ type: 'text' })
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

    @Column({ default: false })
    isStamped: boolean;

    @Column({ nullable: true })
    ruinsNumber: string;

    @Column({ nullable: true })
    ruinsDay: string;
}
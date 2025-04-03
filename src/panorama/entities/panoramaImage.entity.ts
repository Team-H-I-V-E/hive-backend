import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Panorama } from './panorama.entity';

@Entity()
export class PanoramaImage {
    @PrimaryGeneratedColumn()
    panoramaImageId: number;

    @ManyToOne(() => Panorama, panorama => panorama.panoramaImages)
    @JoinColumn({ name: 'panoramaId' })
    panorama: Panorama;    
    
    @Column()
    panoramaImage: string;
}
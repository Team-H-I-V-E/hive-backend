import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

    @Column()
    panoramaImage: string;

    @Column({ type: 'decimal', precision: 10, scale: 8 }) // 소수점 허용
    panoramaLatitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 }) // 소수점 허용
    panoramaLongitude: number;
}

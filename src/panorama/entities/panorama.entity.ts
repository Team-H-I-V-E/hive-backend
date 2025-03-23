import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    panoramaLatitude: number;

    @Column()
    panoramaLongitude: number;
}
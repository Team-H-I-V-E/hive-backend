import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('heritage')
export class Heritage{
    @PrimaryGeneratedColumn()
    heritageId: number;

    @Column()
    heritageModelId: number;

    @Column()
    heritage3dModelId: number;

    @Column()
    heritageName: string;

    @Column()
    heritageDescription: string;

    @Column()
    heritageYear: number;

    @Column()
    heritageLocation: string;

    @Column('point')
    heritageCoordinate: string; // 좌표 정보

}
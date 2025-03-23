import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stamp {
  @PrimaryGeneratedColumn()
  stampID: number;

  // @Column()
  // panoramaViewerID: number;

  @Column()
  stampImage: string;

  @Column('point')
  stampCoordinate: string; // 위도, 경도
}
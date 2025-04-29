import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stamp {
  @PrimaryGeneratedColumn()
  stampID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampImage: string | null;

  @Column('decimal', { precision: 30, scale: 18 })
  stampLatitude: number;

  @Column('decimal', { precision: 30, scale: 18 })
  stampLongitude: number;
}
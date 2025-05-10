import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['stampNum'])
export class Stamp {
  @PrimaryGeneratedColumn()
  stampID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampNum: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  stampName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampPeriod: string;

  @Column('text', { nullable: true })
  stampDescription: string;

  @Column('decimal', { precision: 30, scale: 18 })
  stampLatitude: number | null;

  @Column('decimal', { precision: 30, scale: 18 })
  stampLongitude: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampLocation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampImage: string | null;
}
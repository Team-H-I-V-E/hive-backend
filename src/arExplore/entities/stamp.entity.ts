import { CollectedStamp } from 'src/collectionStamp/entities/collectedStamp.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';

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
  stampLatitude: number;

  @Column('decimal', { precision: 30, scale: 18 })
  stampLongitude: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampLocation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stampImage: string | null;

  @OneToMany(() => CollectedStamp, cs => cs.stamp)
  collectedStamps: CollectedStamp[];
}
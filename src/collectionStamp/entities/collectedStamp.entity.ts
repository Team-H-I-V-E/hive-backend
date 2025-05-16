import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import { Stamp } from 'src/arExplore/entities/stamp.entity';

@Entity({ name: 'collected_stamp' })
export class CollectedStamp {
  @PrimaryGeneratedColumn()
  collectedStampID: number;

  @Column()
  stampID: number;

  @Column()
  userID: number;

  @CreateDateColumn()
  stampTime: Date;

  @ManyToOne(() => Stamp, stamp => stamp.collectedStamps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stampID' })
  stamp: Stamp;
}
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Heritage3DModel } from './heritage3dModel.entity';

@Entity('heritage')
export class Heritage {
  @PrimaryGeneratedColumn()
  heritageId: number;

  @Column({ default: '' })
  heritageName: string;

  @Column({ length: 500, default: '' })
  heritageDescription: string;

  @Column({ default: '' })
  heritageYear: string;

  @Column({ default: '' })
  heritageLocation: string;

  @Column({ type: 'float', default: 0 })
  heritageLatitude: number;

  @Column({ type: 'float', default: 0 })
  heritageLongitude: number;

  @OneToOne(() => Heritage3DModel, (heritage3dModel) => heritage3dModel.heritage, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'heritageId' })
  heritage3dModel?: Heritage3DModel;
}

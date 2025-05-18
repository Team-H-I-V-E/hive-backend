import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Heritage3DModel } from './heritage3dModel.entity';

@Entity('heritage')
export class Heritage {
  @PrimaryGeneratedColumn()
  heritageId: number;

  @Column({ default: '' })
  heritageName: string;

  @Column({ default: '' })
  heritageType: string;      // 유형

  @Column({ default: '' })
  heritageYear: string;     //시대 

  @Column({ default: '' })
  heritageCategory: string;  // 분류

  @Column({ default: '' })
  heritagePeriodArea: string;  // 면적

  @Column({ type: 'date', nullable: true })
  designationDate: Date | null; // 지정일

  @Column({ default: '' })
  heritageLocation: string;

  @Column({ length: 500, default: '' })
  heritageDescription: string;

  @Column({ type: 'float', default: 0 })
  heritageLatitude: number;

  @Column({ type: 'float', default: 0 })
  heritageLongitude: number;

  @Column({ default: '', length: 1000 })
  heritageImageUrl: string;

  @OneToOne(() => Heritage3DModel, (model) => model.heritage)
  heritage3DModel?: Heritage3DModel;
}

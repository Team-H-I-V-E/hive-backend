import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Heritage } from './heritage.entity';

@Entity('heritage_3d_model')
export class Heritage3DModel {
  @PrimaryGeneratedColumn()
  heritage3dModelId: number;

  @Column({ nullable: false })
  modelFileUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Heritage, (heritage) => heritage.heritage3DModel, { eager: true })
  @JoinColumn({ name: 'heritageId' }) 
  heritage: Heritage;
}

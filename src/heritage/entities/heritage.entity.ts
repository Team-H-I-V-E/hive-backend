import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('heritage')
export class Heritage {
  @PrimaryGeneratedColumn()
  heritageId: number;

  @Column({ default: 0 })  // 기본값 0
  heritageModelId: number;

  @Column({ default: 0 })  // 기본값 0
  heritage3dModelId: number;

  @Column({ default: '' })  // 기본값 빈 문자열
  heritageName: string;

  @Column({ length:500, default: '' })  // 기본값 빈 문자열
  heritageDescription: string;

  @Column({ default: '' })  // 기본값 0
  heritageYear: string;

  @Column({ default: '' })  // 기본값 빈 문자열
  heritageLocation: string;

  @Column({ type: 'float', default: 0 })  // 기본값 0
  heritageLatitude: number;

  @Column({ type: 'float', default: 0 })  // 기본값 0
  heritageLongitude: number;
}
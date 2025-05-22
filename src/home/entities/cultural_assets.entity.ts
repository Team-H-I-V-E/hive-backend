import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cultural_assets')
export class CulturalAsset {
  @PrimaryGeneratedColumn({ name: 'caId', comment: '문화유산 식별 번호' })
  caId: number;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '유산명' })
  name: string;

  @Column({ name: 'name_eng', type: 'varchar', length: 255, nullable: false, comment: '유산영어명' })
  nameEng: string;

  @Column({ type: 'text', nullable: false, comment: '유산 내용' })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '시대' })
  era: string | null;

  @Column({ name: 'designation_date', type: 'date', nullable: true, comment: '지정(등록)일' })
  designationDate: string | null;

  @Column({ name: 'era_detail', type: 'varchar', length: 255, nullable: true, comment: '시대 세부내용' })
  eraDetail: string | null;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: false, comment: '이미지 경로(URL)' })
  imageUrl: string;
}

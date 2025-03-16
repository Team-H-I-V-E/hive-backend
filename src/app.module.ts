import { Module } from '@nestjs/common';
import { ArExperienceModule } from './arExperience/arExperience.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArExperienceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
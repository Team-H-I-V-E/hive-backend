import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './configs/typeorm.config'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({...typeOrmConfig}),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

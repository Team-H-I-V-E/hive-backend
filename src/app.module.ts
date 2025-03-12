import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from './heritage/entities/heritage.entity';
import { HeritageModule } from './heritage/heritage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({

      isGlobal: true, //환경 변수를 전역으로 설정
      envFilePath: '.env',

    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'), 
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [Heritage],
        synchronize: true,
        logging: true,
        timezone: 'local',
      }),
    }),
    
    HeritageModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


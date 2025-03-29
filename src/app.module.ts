import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { typeOrmConfig } from './configs/typeorm.config';
import { HeritageModule } from './heritage/heritage.module';
import { ArExperienceModule } from './arExperience/arExperience.module';
import { ArticleModule } from './article/article.module';
import { PanoramaModule } from './panorama/panorama.module';
import { ArticleFavoriteModule } from './favorite/articleFavorite.module';
import { PanoramaFavoriteModule } from './favorite/panoramaFavorite.module';
import { Heritage3DModelModule } from './heritage/heritage.3dModel.moduel';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as sqlite3 from 'sqlite3';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/', // http://localhost:3000/images/xxx.jpg
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticleModule,
    PanoramaModule,
    ArticleFavoriteModule,
    PanoramaFavoriteModule,
    HeritageModule,
    Heritage3DModelModule,
    ArExperienceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: 'DATABASE_CONFIG',
      useValue: new sqlite3.Database('path_to_db.db'),
    }
  ],
  exports: ['DATABASE_CONFIG']
})
export class AppModule {}
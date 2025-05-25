import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CulturalAsset } from "./entities/cultural_assets.entity";
import { HomeController } from "./controller/home.controller";
import { HomeService } from "./service/home.service";

@Module ({
    imports: [TypeOrmModule.forFeature([CulturalAsset])],
    controllers: [HomeController],
    providers: [HomeService],
})
export class HomeModule {}
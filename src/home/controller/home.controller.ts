import { Controller, Get } from "@nestjs/common";
import { HomeService } from "../service/home.service";
import { CulturalAssetDto } from "../dto/cultural-asset.dto";

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getAllAssets(): Promise<CulturalAssetDto[]> {
    return this.homeService.findAll();
  }
}
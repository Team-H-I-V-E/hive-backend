import { IsNotEmpty } from "class-validator";

export class PanoramaFavoriteRequestDto {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    panoramaId: number;
    
}
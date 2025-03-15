import { IsNotEmpty } from "class-validator";

export class PanoramaFavoriteRequestDto {

    @IsNotEmpty()
    userID: number;

    @IsNotEmpty()
    panoramaViewerID: number;
    
}
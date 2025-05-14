import { IsNotEmpty } from "class-validator";

export class PanoramaRequestDto {
    @IsNotEmpty()
    panoramaId: number;
}
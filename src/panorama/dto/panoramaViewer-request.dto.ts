import { IsNotEmpty } from "class-validator";

export class PanoramaViewerRequestDto {
    @IsNotEmpty()
    panoramaViewerID: number;
}
import { Injectable } from '@nestjs/common';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';
import { PanoramaFavoriteRequestDto } from '../dto/panoramaFavorite/panoramaFavorite-request.dto';
import { panoramaFavorite } from '../entities/panoramaViewerFavorite.entity';

@Injectable()
export class PanoramaViewerService {
    private panoramaViewers: PanoramaViewer[] = [];
    private panoramaFavorite: panoramaFavorite[] = [];

    getAllPanoramaViewers(): PanoramaViewer[] {
        return this.panoramaViewers;
    }

    addPanoramaFavorite(panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto) {
        const {panoramaFavoriteID, userID, panoramaViewerID, } = panoramaFavoriteRequestDto;

        const favorite: panoramaFavorite = {
            panoramaFavoriteID,
            userID,
            panoramaViewerID,
            panoramaFavoriteCreatedAt: new Date,
        }
        this.panoramaFavorite.push(favorite);
        return favorite;
    }
    

}
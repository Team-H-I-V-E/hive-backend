import { Injectable } from '@nestjs/common';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';
import { PanoramaFavoriteRequestDto } from '../dto/panoramaFavorite/panoramaFavorite-request.dto';
import { panoramaFavorite } from '../entities/panoramaViewerFavorite.entity';

@Injectable()
export class PanoramaViewerService {
    private panoramaViewers: PanoramaViewer[] = [];
    private panoramaFavorites: panoramaFavorite[] = [];

    getAllPanoramaViewers(): PanoramaViewer[] {
        return this.panoramaViewers;
    }

    addPanoramaFavorite(panoramaFavoriteRequestDto: PanoramaFavoriteRequestDto) {
        const {userID, panoramaViewerID, } = panoramaFavoriteRequestDto;

        const favorite: panoramaFavorite = {
            panoramaFavoriteID: this.panoramaFavorites.length + 1,
            userID,
            panoramaViewerID,
            panoramaFavoriteCreatedAt: new Date,
        }
        this.panoramaFavorites.push(favorite);
        return favorite;
    }
    
    deletePanoramaFavorite(panoramaFavoriteID: number): void {
        this.panoramaFavorites = this.panoramaFavorites.filter((favorite) => favorite.panoramaFavoriteID !== panoramaFavoriteID);
    }    

}
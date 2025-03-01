import { Injectable } from '@nestjs/common';
import { PanoramaViewer } from '../entities/panoramaViewer.entity';

@Injectable()
export class PanoramaViewerService {
    
    private panoramaViewers: PanoramaViewer[] = [];

    getAllPanoramaViewers(): PanoramaViewer[] {
        return this.panoramaViewers;
    }

}
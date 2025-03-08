import { Injectable, InternalServerErrorException } from "@nestjs/common";
 import { createPool, Pool } from "mysql2/promise";
import { databaseConfig } from "src/configs/database.config";
import { PanoramaViewer } from "../entities/panoramaViewer.entity";
import { PanoramaFavorite } from "../entities/panoramaViewerFavorite.entity";
 
 @Injectable()
 export class PanoramaViewerRepository {
     private connectionPool: Pool;
 
     constructor() {
         this.connectionPool = createPool(databaseConfig);
         this.connectionPool.getConnection()
             .then(() => console.log('Database connected successfully'))
             .catch(err => console.error('Database connection failed:', err));
     }

     async findAll(): Promise<PanoramaViewer[]> {
        const selectQuery = `SELECT * FROM panoramaViewer`;
        
        try {
            const [results] = await this.connectionPool.query(selectQuery);
            return results as PanoramaViewer[] || [];
        } catch (err) {
            throw new InternalServerErrorException('Database query failed', err);
        }
    }

    async addFavorite(favorite: PanoramaFavorite): Promise<string> {
        const insertQuery = `INSERT INTO panoramaFavorite (panoramaFavoriteID, userID, panoramaViewerID, panoramaFavoriteCreatedAt) VALUES (?, ?, ?, ?)`;
        
        try {
            const result = await this.connectionPool.query(insertQuery, [favorite.panoramaFavoriteID, favorite.userID, favorite.panoramaViewerID, favorite.panoramaFavoriteCreatedAt]);
            const message = 'Panorama Favorite created successfully.'
            return message;
        } catch (err) {
            throw new InternalServerErrorException('Database query failed', err);
        }
    }
 }
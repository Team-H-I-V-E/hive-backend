import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    connectionLimit: 10,
    insecureAuth: true,
};
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm"
import { Request } from "express";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable ()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        super ({
            secretOrKey: process.env.JWT_SECRET as string,
            jwtFromRequest: ExtractJwt.fromExtractors([(req:Request) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['Authorization'];
                }
                return token;
            }]),
        });
    }
    async validate(payload) {
        const { userEmail } = payload;
    
        const user = await this.usersRepository.findOne({ where : {userEmail}});
    
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
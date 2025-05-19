import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { UserService } from "src/user/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWTStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION,
            }
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JWTStrategy],
    exports: [JwtModule, PassportModule]
})

export class AuthModule{}
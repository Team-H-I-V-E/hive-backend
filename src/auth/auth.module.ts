import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { UserService } from "src/user/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})

export class AuthModule{}
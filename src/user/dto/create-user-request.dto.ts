import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string;

    @IsEmail()
    userEmail: string;

    @IsString()
    @MinLength(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.'})
    userPassword: string;

    @IsString()
    nickname: string;
}
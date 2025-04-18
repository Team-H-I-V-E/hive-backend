import { IsNotEmpty, MaxLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @MaxLength(20)
    userPassword: string;

    @IsNotEmpty()
    @MaxLength(100)
    userEmail: string;
}
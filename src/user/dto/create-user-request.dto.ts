import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()   //null 값 체크
    @MinLength(2)   //최소 문자 수
    @MaxLength(20)  //최대 문자 수
    @IsString()
    userName: string;

    @IsNotEmpty()
    @MaxLength(20)
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    @MaxLength(20)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password too weak', })//대소문자,숫자,특수문자 포함
    @IsString()
    @MinLength(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.'})
    userPassword: string;

    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(2)
    @IsString() 
    nickname: string;
}
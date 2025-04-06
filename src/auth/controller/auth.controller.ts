import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // 회원 가입 기능
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> 
    {
        const userResponseDto = new UserResponseDto(await this.authService.createUser(createUserDto))
        return userResponseDto;
    }

    // 로그인 기능
    @Post('/signin')
    async logIn(@Body() loginUserDto: LoginUserDto, @Res () res:Response): Promise<void> 
    {
        const accessToken = await this.authService.logIn(loginUserDto);

        res.cookie('Authorization', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 360000,
            sameSite: 'none'
        });

        res.send({message: "Login Succes"});
    }
}

import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { Response } from 'express';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


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

    // 인증된 회원이 들어갈 수 있는 테스트 URL 경로
    @Post('/test')
    @UseGuards(AuthGuard())
    testForAuth(@Req() req: Request) {
        console.log(req.user);
        return {message: 'You are authenticated', user: req.user};
    }
}

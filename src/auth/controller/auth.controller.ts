import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService) {}

    // 회원 가입 기능
    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.authService.createUser(createUserDto);
    }

    // 로그인 기능
    @Post('/signin')
    logIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.logIn(loginUserDto);
    }
}

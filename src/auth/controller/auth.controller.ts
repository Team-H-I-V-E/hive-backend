import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UserService,
    ) {}

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        //UserService에서 비밀번호 해싱과 사용자 생성 로직처리
        return await this.usersService.createUser(createUserDto);
    }
}
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto'; // 
import { UserService } from 'src/user/user.service';

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    // 회원 가입 기능
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        console.log(createUserDto);

        if (!createUserDto || !createUserDto.userEmail) {
            throw new BadRequestException('잘못된 요청입니다. DTO 확인 필요.');
        }
        const user = await this.authService.createUser(createUserDto);
        return new UserResponseDto(user);
    }
}

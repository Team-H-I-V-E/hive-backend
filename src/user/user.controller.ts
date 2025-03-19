import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-request.dto';

@Controller('user')
export class UserController {

    constructor(private usersService: UserService) {}

    @Get('/')
    async getAllUser(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }
}

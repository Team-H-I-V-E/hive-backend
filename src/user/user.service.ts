import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStatus } from './entities/user-role.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // async findByID(userEmail: string): Promise<void> {
    //     //데이터베이스에서 아이디로 사용자 검색
    // }


    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
    
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-request.dto';
import * as bcrypt from 'bcrypt'
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

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { userEmail, userPassword, userName, nickname } = createUserDto;

        //중복 이메일 검사
        const exist = await this.userRepository.findOne({ where: { userEmail }});
        if (exist) {
            throw new BadRequestException('이미 존재하는 아이디입니다.')
        }

        //비밀번호 해싱
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash( userPassword, saltRounds );

        const newUser = this.userRepository.create({
            userName,
            userEmail,
            userPassword: hashedPassword,
            nickname,
        });

        return await this.userRepository.save(newUser);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
    
}

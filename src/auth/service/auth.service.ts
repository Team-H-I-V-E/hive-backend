import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}  

    //회원가입
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
}

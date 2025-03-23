import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user-request.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from 'src/user/dto/login-user.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}  

    //회원가입
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { userEmail, userPassword, userName, nickname } = createUserDto;

        // 이메일 중복 확인
        

        //비밀번호 해싱
        
        const hashedPassword = await this.hashPassword( userPassword );

        const newUser = this.userRepository.create({
            userName,
            userEmail,
            userPassword: hashedPassword,
            nickname,
        });

        return await this.userRepository.save(newUser);
    }

    // 로그인
    async logIn(loginUserDto: LoginUserDto): Promise<string> {
        const {userEmail, userPassword} = loginUserDto;

        const existingUser = await this.findUserByEmail(userEmail);

        if (!existingUser || !(await bcrypt.compare(userPassword, existingUser.userPassword))) {
            throw new UnauthorizedException('올바르지 않은 이메일 또는 비밀번호 입니다.');
        }
        
        return '로그인 성공'
    }
    
    //이메일 중복 확인 메서드
    private async checkEmailExists(userEmail: string): Promise<void> {
        const existingUser = await this.findUserByEmail(userEmail);
        if (existingUser) {
            throw new ConflictException('이미 존재하는 아이디입니다.')
        }
    }

    //이메일로 유저 찾기 메서드
    private async findUserByEmail(userEmail: string): Promise<User | null> {
        return await this.userRepository.findOne({where: {userEmail}});
    }

    // 비밀번호 해싱 암호화 메서드
    private async hashPassword(userPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(userPassword, salt);
    }

}

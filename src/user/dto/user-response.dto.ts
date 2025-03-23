import { User } from 'src/user/entities/user.entity';

export class UserResponseDto {
    userId: number;
    userEmail: string;
    userName: string;
    nickname: string;
    userCreatedAt: Date;
    userUpdatedAt: Date;

    constructor(user: User) {
        this.userId = user.userId;
        this.userEmail = user.userEmail;
        this.userName = user.userName;
        this.nickname = user.nickname;
        this.userCreatedAt = user.userCreatedAt;
        this.userUpdatedAt = user.userUpdatedAt;
    }
}

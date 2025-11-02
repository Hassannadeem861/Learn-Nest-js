import { UserService } from 'src/user/user.service';
import { RegisterUser } from './dto/register-user-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user-schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private userModel;
    constructor(userService: UserService, jwtService: JwtService, userModel: Model<User>);
    register(registerUserDto: RegisterUser): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    login(registerUserDto: RegisterUser): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getUserById(id: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}

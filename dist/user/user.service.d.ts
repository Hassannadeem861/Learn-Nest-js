import { RegisterUser } from 'src/auth/dto/register-user-dto';
import { Model } from 'mongoose';
import { User } from './schemas/user-schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(registerUserDto: RegisterUser): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    loginUser(registerUserDto: RegisterUser): Promise<void>;
}

import { AuthService } from './auth.service';
import { RegisterUser } from './dto/register-user-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUser): Promise<{
        message: string;
        createUser: {
            token: string;
            user: import("mongoose").Document<unknown, {}, import("../user/schemas/user-schema").User, {}, {}> & import("../user/schemas/user-schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        };
    }>;
    login(registerUserDto: RegisterUser): Promise<{
        message: string;
        success: boolean;
        loginUser: {
            token: string;
            user: import("mongoose").Document<unknown, {}, import("../user/schemas/user-schema").User, {}, {}> & import("../user/schemas/user-schema").User & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        };
    }>;
    getProfile(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../user/schemas/user-schema").User, {}, {}> & import("../user/schemas/user-schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}

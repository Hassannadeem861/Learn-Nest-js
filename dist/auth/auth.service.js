"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user-schema");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    userService;
    jwtService;
    userModel;
    constructor(userService, jwtService, userModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async register(registerUserDto) {
        const saltRounds = 10;
        const hashPassword = await bcrypt_1.default.hash(registerUserDto.password, saltRounds);
        const user = await this.userService.createUser({
            ...registerUserDto,
            password: hashPassword,
        });
        const payload = {
            sub: user._id,
            username: user.username,
            email: user.email,
        };
        const token = await this.jwtService.signAsync(payload);
        return { token, user };
    }
    async login(registerUserDto) {
        try {
            const { email, password } = registerUserDto;
            if (!email || !password) {
                throw new common_1.BadRequestException({
                    message: 'Email and password are required',
                });
            }
            const user = await this.userModel.findOne({
                email: registerUserDto.email,
            });
            if (!user ||
                !(await bcrypt_1.default.compare(registerUserDto.password, user.password))) {
                throw new common_1.BadRequestException('Invalid email or password');
            }
            const payload = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            };
            const token = await this.jwtService.signAsync(payload);
            return { token, user };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException({
                message: 'Something went wrong on the server',
                error: error.message,
            });
        }
    }
    async getUserById(id) {
        const findUser = await this.userModel.findOne({ _id: id });
        return findUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map
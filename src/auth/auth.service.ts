import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUser } from './dto/register-user-dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user-schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(registerUserDto: RegisterUser) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );

    // DTO => Data transfer object
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

  async login(registerUserDto: RegisterUser) {
    // const user1 = await this.userService.loginUser({
    //   ...registerUserDto,
    // });

    try {
      const { email, password } = registerUserDto;

      if (!email || !password) {
        throw new BadRequestException({
          message: 'Email and password are required',
        });
      }

      const user = await this.userModel.findOne({
        email: registerUserDto.email,
      });

      if (
        !user ||
        !(await bcrypt.compare(registerUserDto.password, user.password))
      ) {
        throw new BadRequestException('Invalid email or password');
      }

      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const token = await this.jwtService.signAsync(payload);
      return { token, user };
    } catch (error) {
      // Agar error already BadRequestException hai to usi ko throw karo
      if (error instanceof BadRequestException) {
        throw error;
      }

      //Agar koi unexpected server ya database error aa jaye (jo BadRequestException nahi hai), to hum InternalServerErrorException throw karte hain, jo NestJS me HTTP 500 return karta hai.
      throw new InternalServerErrorException({
        message: 'Something went wrong on the server',
        error: error.message, // asli error message bhi include kar sakte ho
      });
    }
  }

  async getUserById(id) {
    const findUser = await this.userModel.findOne({ _id: id });
    return findUser;
  }
}

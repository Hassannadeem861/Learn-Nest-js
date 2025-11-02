import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUser } from 'src/auth/dto/register-user-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user-schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUser) {
    const { username, email, password } = registerUserDto;

    if (!username || !email || !password) {
      throw new BadRequestException({
        message: 'Email and password are required',
      });
    }

    const emailExist = await this.userModel.findOne({ email: email });

    if (emailExist) {
      throw new BadRequestException('Email already registered');
    }

    return await this.userModel.create({
      username,
      email,
      password,
    });
  }

  async loginUser(registerUserDto: RegisterUser) {
    // const { email, password } = registerUserDto;
    // if (!email || !password) {
    //   throw new BadRequestException({ message: 'Email and password are required' });
    // }
    // const user = await this.userModel.findOne({ email: email });
    // if (!user) {
    //   throw new BadRequestException('Invalid email or password');
    // }
  }
}

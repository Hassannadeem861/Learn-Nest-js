// DATA TRANFER OBJECT
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUser {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

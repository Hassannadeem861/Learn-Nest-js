import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { userLevel } from '../entities/course.entity';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(userLevel)
  level: userLevel; // ab automatically enum validation ho jayega
}

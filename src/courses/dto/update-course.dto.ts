import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { userLevel } from '../entities/course.entity';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
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

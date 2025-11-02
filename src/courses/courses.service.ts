import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, userLevel } from './entities/course.entity';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto) {
    const { title, description, price, level } = createCourseDto;

    if (!title || !description || !price || !level) {
      throw new BadRequestException(
        'Title, description and price are required',
      );
    }

    if (level && !Object.values(userLevel).includes(level)) {
      throw new BadRequestException(
        `Level must be one of ${Object.values(userLevel).join(', ')}`,
      );
    }

    const newCourse = new this.courseModel({
      title,
      description,
      price,
      level: level || userLevel.Beginner, // default beginner
      created_at: new Date(),
    });

    return newCourse.save();
  }

  async findAll() {
    const getAllCourses = await this.courseModel.find({ deleted_at: null }).exec();
    if (getAllCourses.length === 0) {
      throw new NotFoundException('Course not found');
    }
    return { message: 'Get all message successfully', courses: getAllCourses };
  }

  async findOne(id: string) {
    const course = await this.courseModel
      .findOne({ _id: id, deleted_at: null })
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseModel
      .findOne({ _id: id, deleted_at: null })
      .exec();
    console.log(course);

    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    if (updateCourseDto.title) course.title = updateCourseDto.title;
    if (updateCourseDto.description)
      course.description = updateCourseDto.description;
    if (updateCourseDto.price) course.price = updateCourseDto.price;
    if (updateCourseDto.level) {
      if (!Object.values(userLevel).includes(updateCourseDto.level)) {
        throw new BadRequestException(
          `Level must be one of ${Object.values(userLevel).join(', ')}`,
        );
      }
      course.level = updateCourseDto.level;
    }

    course.updated_at = new Date();
    return await course.save();
  }

  async remove(id: string) {
    const course = await this.courseModel
      .findOne({ _id: id, deleted_at: null })
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    course.deleted_at = new Date();
    await course.save();
  }
}

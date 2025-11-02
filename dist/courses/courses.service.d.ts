import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';
export declare class CoursesService {
    private courseModel;
    constructor(courseModel: Model<Course>);
    create(createCourseDto: CreateCourseDto): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<{
        message: string;
        courses: (import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, Course, {}, {}> & Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}

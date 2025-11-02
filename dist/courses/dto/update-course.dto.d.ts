import { CreateCourseDto } from './create-course.dto';
import { userLevel } from '../entities/course.entity';
declare const UpdateCourseDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCourseDto>>;
export declare class UpdateCourseDto extends UpdateCourseDto_base {
    title: string;
    description: string;
    price: number;
    level: userLevel;
}
export {};

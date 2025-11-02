import { userLevel } from '../entities/course.entity';
export declare class CreateCourseDto {
    title: string;
    description: string;
    price: number;
    level: userLevel;
}

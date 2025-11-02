import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/course.entity").Course, {}, {}> & import("./entities/course.entity").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<{
        message: string;
        courses: (import("mongoose").Document<unknown, {}, import("./entities/course.entity").Course, {}, {}> & import("./entities/course.entity").Course & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/course.entity").Course, {}, {}> & import("./entities/course.entity").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/course.entity").Course, {}, {}> & import("./entities/course.entity").Course & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}

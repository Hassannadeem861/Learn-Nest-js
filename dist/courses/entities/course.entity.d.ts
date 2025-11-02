import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<Course>;
export declare enum userLevel {
    Beginner = "BIGINNER",
    Intermediate = "INTERMEDIATE",
    Advanced = "ADVANCED"
}
export declare class Course {
    title: string;
    description: string;
    level: string;
    price: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, import("mongoose").Document<unknown, any, Course, any, {}> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Course>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_entity_1 = require("./entities/course.entity");
const mongoose_2 = require("mongoose");
let CoursesService = class CoursesService {
    courseModel;
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async create(createCourseDto) {
        const { title, description, price, level } = createCourseDto;
        if (!title || !description || !price || !level) {
            throw new common_1.BadRequestException('Title, description and price are required');
        }
        if (level && !Object.values(course_entity_1.userLevel).includes(level)) {
            throw new common_1.BadRequestException(`Level must be one of ${Object.values(course_entity_1.userLevel).join(', ')}`);
        }
        const newCourse = new this.courseModel({
            title,
            description,
            price,
            level: level || course_entity_1.userLevel.Beginner,
            created_at: new Date(),
        });
        return newCourse.save();
    }
    async findAll() {
        const getAllCourses = await this.courseModel.find({ deleted_at: null }).exec();
        if (getAllCourses.length === 0) {
            throw new common_1.NotFoundException('Course not found');
        }
        return { message: 'Get all message successfully', courses: getAllCourses };
    }
    async findOne(id) {
        const course = await this.courseModel
            .findOne({ _id: id, deleted_at: null })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with id ${id} not found`);
        }
        return course;
    }
    async update(id, updateCourseDto) {
        const course = await this.courseModel
            .findOne({ _id: id, deleted_at: null })
            .exec();
        console.log(course);
        if (!course) {
            throw new common_1.NotFoundException(`Course with id ${id} not found`);
        }
        if (updateCourseDto.title)
            course.title = updateCourseDto.title;
        if (updateCourseDto.description)
            course.description = updateCourseDto.description;
        if (updateCourseDto.price)
            course.price = updateCourseDto.price;
        if (updateCourseDto.level) {
            if (!Object.values(course_entity_1.userLevel).includes(updateCourseDto.level)) {
                throw new common_1.BadRequestException(`Level must be one of ${Object.values(course_entity_1.userLevel).join(', ')}`);
            }
            course.level = updateCourseDto.level;
        }
        course.updated_at = new Date();
        return await course.save();
    }
    async remove(id) {
        const course = await this.courseModel
            .findOne({ _id: id, deleted_at: null })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with id ${id} not found`);
        }
        course.deleted_at = new Date();
        await course.save();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_entity_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map
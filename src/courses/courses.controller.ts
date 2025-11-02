import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/v1')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard)
  @Post('/create-course')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('/get-all-courses')
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('/get-single-course/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put('/update-course/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete('/delete-course/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}

import { Controller, Get, Post, Body, Param, Res, Put, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService){}
  
  // Get all
  @Get()
  findAll(): Course[] {
    return this.coursesService.findAll()
  }
  // request com params
  @Get(':id')
  findOne(@Param('id') id: number) : Course{
    return this.coursesService.findOne(id)
  }

  @Post()
  create(@Body() courseCreateDTO: CreateCourseDTO) {
    return this.coursesService.create(courseCreateDTO)
  }

  @Put(':id')
  update(@Res() res, @Body() updateCourseDTO: UpdateCourseDTO, @Param('id') id: number): void {
    this.coursesService.update(id, updateCourseDTO)
    return res.status(200).json({message: "course updated successfully"})
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.coursesService.remove(id)
  }
}

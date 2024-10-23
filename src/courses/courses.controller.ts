import { Controller, Get, Post, Body, Param, Res, Put, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService){}
  
  // Get all
  @Get()
  async findAll(){
    return this.coursesService.findAll()
  }
  // request com params
  @ApiResponse({status:404 , description: 'Course not found'})
  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.coursesService.findOne(id)
  }

  @Post()
  async create(@Body() courseCreateDTO: CreateCourseDTO) {
    return this.coursesService.create(courseCreateDTO)
  }

  @ApiResponse({status:404 , description: 'Course not found'})
  @Put(':id')
  async update(@Body() updateCourseDTO: UpdateCourseDTO,
    @Param('id') id: string) {
    return this.coursesService.update(id, updateCourseDTO)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({status:404 , description: 'Course not found'})
  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return this.coursesService.remove(id)
  }
}

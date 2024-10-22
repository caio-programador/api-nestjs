import { Controller, Get, Post, Body, Param, Res, Put, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService){}
  
  // Get all
  @Get()
  async findAll(){
    return this.coursesService.findAll()
  }
  // request com params
  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.coursesService.findOne(id)
  }

  @Post()
  async create(@Body() courseCreateDTO: CreateCourseDTO) {
    return this.coursesService.create(courseCreateDTO)
  }

  @Put(':id')
  async update(@Res() res, @Body() updateCourseDTO: UpdateCourseDTO,
    @Param('id') id: string) {
    this.coursesService.update(id, updateCourseDTO)
    return res.status(200).json({message: "course updated successfully"})
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return this.coursesService.remove(id)
  }
}

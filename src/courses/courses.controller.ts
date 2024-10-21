import { Controller, Get, Post, Body, Param, Res, Put, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity';

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
    return this.coursesService.findOne(+id)
  }

  @Post()
  create(@Res() res, @Body() courseCreateDTO): void {
    this.coursesService.create(courseCreateDTO)
    return res.status(201).json({message: 'course created successfully'})
  }

  @Put(':id')
  update(@Res() res, @Body() body, @Param('id') id: number): void {
    this.coursesService.update(+id, body)
    return res.status(200).json({message: "course updated successfully"})
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourse(@Res() res, @Param('id') id: number) {
    return this.coursesService.remove(+id)
  }
}

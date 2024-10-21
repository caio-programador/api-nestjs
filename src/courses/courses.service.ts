import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Lorem Ipsum silor dolor amet',
      tags: ['node.js', 'nestjs', 'javascript', 'typescript']
    },
  ]

  findAll(): Course[]{
    return this.courses
  }

  findOne(id: number): Course{
    const course = this.courses.find(course => course.id === id)
    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return course
  }

  create(createCourseDTO: any): void {
    this.courses.push(createCourseDTO)
  }

  update(id: number, updateCourseDTO: any): void{
    const course = this.findOne(id)
    if (course) {
      const index = this.courses.findIndex(course => course.id === id)
      this.courses[index] = {
        id,
        ...updateCourseDTO,
      }
    }
  }

  remove(id: number): string{
    const index = this.courses.findIndex(course => course.id === id)
    if (index >= 0) {
      this.courses.splice(index, 1)

      return "Excluído"
    }
  }



}

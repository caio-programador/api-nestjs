import { Controller, Get, Post, Body, Param, Res, Put, Patch, Delete } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  
  // Get all
  @Get()
  findAll(@Res() res ){
    return res.json({message: "EAI MEU AMIGAO"})
  }
  // request com params
  @Get(':id')
  findOne(@Param('id') id: number) {
    return id
  }

  @Post()
  create(@Body() body) {
    return body
  }

  @Put(':id')
  update(@Res() res, @Body() body, @Param('id') id: number) {
    return res.json({id,...body})
  }

  @Patch(':id')
  updateAgain(@Res() res, @Body() body, @Param('id') id: number) {
    return res.json({id,...body})
  }

  @Delete(':id')
  deleteCourse(@Res() res, @Param('id') id) {
  }
}

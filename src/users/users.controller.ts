import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rotas de User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiResponse({
    status: 409, description: 'Email já cadastrado'
  })
  @ApiForbiddenResponse({description: 'Acesso negado'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiForbiddenResponse({description: 'Acesso negado'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 404, description: 'Usuário não encontrado'})
  @ApiForbiddenResponse({description: 'Acesso negado'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiForbiddenResponse({description: 'Acesso negado'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiForbiddenResponse({description: 'Acesso negado'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

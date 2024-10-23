import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signup.dto';
import { User } from './models/users.model';
import { SignInDTO } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signUpDTO: SignUpDTO): Promise<User> {
    return this.usersService.signUp(signUpDTO)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(@Body() signInDTO: SignInDTO):
    Promise<{ name: string, jwtToken: string, email: string }> {
      return this.usersService.signin(signInDTO)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }
}

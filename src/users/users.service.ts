import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/users.model';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) { }

  public async signUp(signUpDTO: SignUpDTO): Promise<User> {
    const user = new this.usersModel(signUpDTO)
    return user.save()
  }

  public async signin(signInDTO: SignInDTO):
    Promise<{ name: string; jwtToken: string; email: string }> {
    const user = await this.findByEmail(signInDTO.email)
    const match = await this.checkPassword(signInDTO.password, user)

    if (!match) {
      throw new NotFoundException('Invalid password')
    }

    const jwtToken = await this.authService.createAccessToken(String(user._id))
    return {name: user.name, jwtToken: jwtToken, email: user.email}

  }

  public async findAll(): Promise<User[]> {
    return this.usersModel.find()
  }


  private async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email })
    if (!user) {
      throw new NotFoundException('Email not found')
    }
    return user
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new NotFoundException('Wrong password')
    }
    return match
  }

  
}

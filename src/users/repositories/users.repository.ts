import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService){}
  
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,     
    })
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            content: true,
            createdAt: true
          }
        }
      }
    })
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({where: {id}})
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }
}
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({description: 'email do usuario'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description: 'nome do usuario'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({description: 'define se o usuario é administrador', default: false})
  @IsBoolean()
  @IsNotEmpty()
  admin: boolean;
}

import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCourseDTO {
  @ApiProperty({description: 'O nome do curso'})
  @IsString()
  readonly name: string
  @ApiProperty({description: 'A descrição do curso'})
  @IsString()
  readonly description: string
  @ApiProperty({description: 'As tags do curso'})
  @IsString({each: true})
  readonly tags: string []
}
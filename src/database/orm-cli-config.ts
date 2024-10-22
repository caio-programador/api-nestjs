import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1729602475163 } from "src/migrations/1729602475163-CreateCoursesTable";
import { CreateTagsTable1729603065986 } from "src/migrations/1729603065986-CreateTagsTable";
import { CreateCoursesTagsTable1729603684011 } from "src/migrations/1729603684011-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTags1729604006307 } from "src/migrations/1729604006307-AddCoursesIdToCoursesTags";
import { AddTagsIdToCoursesTags1729604336569 } from "src/migrations/1729604336569-AddTagsIdToCoursesTags";
import { Tag } from "src/courses/entities/tags.entity";
import { Course } from "src/courses/entities/courses.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1729602475163, CreateTagsTable1729603065986,
    CreateCoursesTagsTable1729603684011, AddCoursesIdToCoursesTags1729604006307,
  AddTagsIdToCoursesTags1729604336569],
})
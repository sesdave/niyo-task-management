import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })  
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Task Description', description: 'The description of the task' })
  @IsString()
  description: string;
}

import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Update Task Title', description: 'The updated title of the task' })    
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Update Task Description', description: 'The updated description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: true, description: 'The completion status of the task' })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}

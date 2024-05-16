import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({ example: 1, description: 'The unique identifier of the task' })  
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Task Description', description: 'The description of the task' })
  @Column()
  description: string;

  @ApiProperty({ example: false, description: 'The completion status of the task' })
  @Column({ default: false })
  isCompleted: boolean;
}

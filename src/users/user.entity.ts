import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })   
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'hashedpassword123', description: 'The hashed password of the user' })
  @Column()
  password: string;
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
        const task = this.tasksRepository.create(createTaskDto);
        return await this.tasksRepository.save(task);
      } catch (error) {
        console.log("Failed to create task", error)
        throw new InternalServerErrorException('Failed to create task');
      }
  }

  async findAll(): Promise<Task[]> {
    try {
        return await this.tasksRepository.find();
      } catch (error) {
        console.log("Failed to fetch tasks", error)
        throw new InternalServerErrorException('Failed to fetch tasks');
      }
  }

  async findOne(id: number): Promise<Task> {
    try {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
      } catch (error) {
        console.log("Failed to fetch task with ID", error)
        throw new InternalServerErrorException(`Failed to fetch task with ID ${id}`);
      }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
        await this.tasksRepository.update(id, updateTaskDto);
        return this.tasksRepository.findOne({where: { id }});
      } catch (error) {
        console.log("Failed to update task with ID", error)
        throw new InternalServerErrorException(`Failed to update task with ID ${id}`);
      }
  }

  async remove(id: number): Promise<void> {
    try {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
      } catch (error) {
        console.log("Failed to delete task with ID", error)
        throw new InternalServerErrorException(`Failed to delete task with ID ${id}`);
      }
  }
}

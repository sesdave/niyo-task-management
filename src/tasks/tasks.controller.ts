import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('task')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
        return await this.tasksService.create(createTaskDto);
      } catch (error) {
        throw new InternalServerErrorException('Failed to create task');
      }
  }

  @Get()
  async findAll() {
    try {
        return await this.tasksService.findAll();
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch tasks');
      }
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'The ID of the task to retrieve' })
  async findOne(@Param('id') id: string) {
    try {
        return await this.tasksService.findOne(+id)
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new InternalServerErrorException(`Failed to fetch task with ID ${id}`);
    
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, description: 'The ID of the task to update' })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
        return await this.tasksService.update(+id, updateTaskDto);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Failed to update task with ID ${id}`);
      }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'The ID of the task to delete' })
  async remove(@Param('id') id: string) {
    try {
        return await this.tasksService.remove(+id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Failed to delete task with ID ${id}`);
      }
  }
}

import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  
  @WebSocketGateway()
  export class TasksGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly tasksService: TasksService) {}
  
    @SubscribeMessage('createTask')
    async handleCreateTask(@MessageBody() createTaskDto: CreateTaskDto) {
      const task = await this.tasksService.create(createTaskDto);
      this.server.emit('taskCreated', task);
    }
  }
  
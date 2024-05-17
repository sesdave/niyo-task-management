import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTasksService = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
    expect(await controller.create(createTaskDto)).toEqual(mockTask);
  });

  it('should find all tasks', async () => {
    expect(await controller.findAll()).toEqual([mockTask]);
  });

  it('should find one task', async () => {
    expect(await controller.findOne('1')).toEqual(mockTask);
  });

  it('should update a task', async () => {
    const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Description' };
    expect(await controller.update('1', updateTaskDto)).toEqual(mockTask);
  });

  it('should delete a task', async () => {
    expect(await controller.remove('1')).toEqual(mockTask);
  });
});

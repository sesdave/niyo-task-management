import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockTask]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    create: jest.fn().mockReturnValue(mockTask),
    save: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    delete: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
    expect(await service.create(createTaskDto)).toEqual(mockTask);
  });

  it('should find all tasks', async () => {
    expect(await service.findAll()).toEqual([mockTask]);
  });

  it('should find one task', async () => {
    expect(await service.findOne(1)).toEqual(mockTask);
  });

  it('should update a task', async () => {
    const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Description' };
    expect(await service.update(1, updateTaskDto)).toEqual(mockTask);
  });

});

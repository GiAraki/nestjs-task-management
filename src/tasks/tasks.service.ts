import { TasksRepository } from "./tasks.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.model";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getTaskById(taskId: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: taskId } });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }
  async deleteTaskById(taskId: string): Promise<void> {
    const result = await this.tasksRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTaskById(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);
    task.status = status;
    this.tasksRepository.save(task);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
}

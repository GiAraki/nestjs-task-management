import { TasksRepository } from "./tasks.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(taskId: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: taskId } });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilterDto(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // deleteTaskById(taskId: string): void {
  //   const found = this.getTaskById(taskId);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskById(taskId: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(taskId);
  //   task.status = status;
  //   return task;
  // }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}

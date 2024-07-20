import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Task, $Enums, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {

  constructor(private readonly prisma: PrismaService) { }

  async createTask(data: { title: string; description?: string; dueDate?: Date; projectId: string; assignedToId?: string }): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUniqueOrThrow({ where: { id } });
  }

  async updateTask(id: string, data: { title?: string; description?: string; dueDate?: Date; status?: $Enums.Status; projectId?: string; assignedToId?: string }): Promise<Task> {
    const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
    return this.prisma.task.delete({ where: { id } });
  }

}
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Task, $Enums, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {

  constructor(private readonly prisma: PrismaService) { }

  async createTask(data: { title: string; description?: string; dueDate?: Date; projectId: string }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        projectId: data.projectId
      }
    });
  };

  async assignTask(taskId: string, userId?: string, teamId?: string): Promise<Task> {
    if (!userId && !teamId) throw new Error('Se debe tener un usuario o equipo para asignar la tarea');
    return this.prisma.task.update({
      where: { id: taskId },
      data: userId ? { assignedToId: userId } : { teamId: teamId },
    });
  };

  async unassignTask(taskId: string): Promise<Task> {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { assignedToId: null, teamId: null },
    });
  };

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc'}
    });
  };

  async getTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUniqueOrThrow({
      where: { id },
      include: { team: true, assignedTo: true }
    });
  };

  async getComments(taskId: string): Promise<any[]> {
    return this.prisma.comment.findMany({
      where: { taskId },
      select: {id: true, content: true, createdAt: true, user: { select: { id: true, firstName: true, lastName: true, email: true } } }, 
      orderBy: { createdAt: 'desc'}
    });
  };

  async updateTask(id: string, data: { title?: string; description?: string; dueDate?: Date; status?: $Enums.Status; projectId?: string; assignedToId?: string }): Promise<Task> {
    const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
    return this.prisma.task.update({ where: { id }, data });
  };

  async deleteTask(id: string): Promise<Task> {
    const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
    return this.prisma.task.delete({ where: { id } });
  };

}
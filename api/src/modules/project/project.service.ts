import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectService {

    constructor(private readonly prisma: PrismaService) { }

    async createProject(data: { name: string; description?: string }): Promise<Project> {
        return this.prisma.project.create({ data });
    }

    async getAllProjects(): Promise<Project[]> {
        return this.prisma.project.findMany();
    }

    async getProjectById(id: string): Promise<Project | null> {
        return this.prisma.project.findUniqueOrThrow({ where: { id } });
    }

    async updateProject(id: string, data: { name?: string; description?: string }): Promise<Project> {
        const project = await this.prisma.project.findUniqueOrThrow({ where: { id } });
        return this.prisma.project.update({ where: { id }, data });
    }

    async deleteProject(id: string): Promise<Project> {
        const project = await this.prisma.project.findUniqueOrThrow({ where: { id } });
        return this.prisma.project.delete({ where: { id } });
    }

}
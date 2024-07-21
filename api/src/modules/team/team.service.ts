import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Team, $Enums, Prisma } from '@prisma/client';

@Injectable()
export class TeamService {

  constructor(private readonly prisma: PrismaService) { }

  async createTeam(data: { name: string }): Promise<Team> {
    return this.prisma.team.create({ data });
  }

  async assignUser(teamId: string, userId: string): Promise<Team> {
    const team = await this.prisma.team.findUniqueOrThrow({ where: { id: teamId }, select: { id: true, members: { select: { id: true } } } });
    if (team.members.some(member => member.id === userId)) throw new Error('El usuario ya pertenece al equipo');
    return this.prisma.team.update({
      where: { id: teamId },
      data: { members: { connect: { id: userId } } },
    });
  }

  async unassignUser(teamId: string, userId: string): Promise<Team> {
    const team = await this.prisma.team.findUniqueOrThrow({ where: { id: teamId }, select: { id: true, members: { select: { id: true } } } });
    if (!team.members.some(member => member.id === userId)) throw new Error('El usuario no pertenece al equipo');
    return this.prisma.team.update({
      where: { id: teamId },
      data: { members: { disconnect: { id: userId } } },
    });
  }

  async getAllTeams(): Promise<Team[]> {
    return this.prisma.team.findMany();
  }

  async getTeamById(id: string): Promise<Team | null> {
    return this.prisma.team.findUniqueOrThrow({
      where: { id },
      include: {
        members: { select: { id: true, email: true, firstName: true, lastName: true, role: true } }
      }
    });
  }

  async updateTeam(id: string, data: { title?: string; description?: string; dueDate?: Date; status?: $Enums.Status; projectId?: string; assignedToId?: string }): Promise<Team> {
    const team = await this.prisma.team.findUniqueOrThrow({ where: { id } });
    return this.prisma.team.update({ where: { id }, data });
  }

  async deleteTeam(id: string): Promise<Team> {
    const team = await this.prisma.team.findUniqueOrThrow({ where: { id } });
    return this.prisma.team.delete({ where: { id } });
  }

}
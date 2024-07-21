import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { CommentGateway } from "./comment.gateway";

@Injectable()
export class CommentService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly commentGateway: CommentGateway
    ) { }

    async createComment(data: { content: string; taskId: string; userId: string }): Promise<Comment> {
        const task = await this.prisma.task.findFirstOrThrow({
            where: { id: data.taskId },
            select: {
                id: true,
                assignedTo: true,
                team: {
                    select: {
                        id: true,
                        members: {
                            select: { id: true }
                        }
                    }
                }
            }
        });
        if (task.assignedTo || task.team) {
            this.commentGateway.emitNotification(data.content, task.assignedTo ? [task.assignedTo.id] : task.team.members.map((member) => member.id));
        }
        return this.prisma.comment.create({ data });
    };

    async updateComment(id: string, data: { content?: string }, userId: string): Promise<Comment> {
        return this.prisma.comment.update({
            where: { id, userId },
            data,
        });
    };

    async deleteComment(id: string, userId: string): Promise<Comment> {
        return this.prisma.comment.delete({
            where: { id, userId },
        });
    };

}
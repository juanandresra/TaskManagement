import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';

@Injectable()
export class CommentService {

    constructor(private readonly prisma: PrismaService) { }

    async createComment(data: { content: string; taskId: string; userId: string }): Promise<Comment> {
        return this.prisma.comment.create({
            data,
        });
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
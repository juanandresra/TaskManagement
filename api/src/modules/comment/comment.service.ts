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
    }

    async getAllComments(): Promise<Comment[]> {
        return this.prisma.comment.findMany();
    }

    async getCommentById(id: string): Promise<Comment | null> {
        return this.prisma.comment.findUnique({
            where: { id },
        });
    }

    async updateComment(id: string, data: { content?: string }): Promise<Comment> {
        return this.prisma.comment.update({
            where: { id },
            data,
        });
    }

    async deleteComment(id: string): Promise<Comment> {
        return this.prisma.comment.delete({
            where: { id },
        });
    }

}
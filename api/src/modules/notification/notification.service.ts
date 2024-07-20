import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {

    constructor(private readonly prisma: PrismaService) { }

    async createNotification(data: { message: string; userId: string }): Promise<Notification> {
        return this.prisma.notification.create({ data });
    }

    async getAllNotifications(): Promise<Notification[]> {
        return this.prisma.notification.findMany();
    }

    async getNotificationById(id: string): Promise<Notification | null> {
        return this.prisma.notification.findUniqueOrThrow({ where: { id } });
    }

    async updateNotification(id: string, data: { message?: string }): Promise<Notification> {
        const notification = await this.prisma.notification.findUniqueOrThrow({ where: { id } });
        return this.prisma.notification.update({ where: { id }, data });
    }

    async deleteNotification(id: string): Promise<Notification> {
        const notification = await this.prisma.notification.findUniqueOrThrow({ where: { id } });
        return this.prisma.notification.delete({ where: { id } });
    }

}
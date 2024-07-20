import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from 'src/utils/httpResponse.util';
import { NotificationService } from 'src/modules/notification/notification.service';
import { Notification } from '@prisma/client';
import { CreateNotificationDto, UpdateNotificationDto } from './notification.validator';

@Controller('notifications')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    async createNotification(@Res() res: Response, @Body() createNotificationDto: CreateNotificationDto) {
        try {
            const result = await this.notificationService.createNotification(createNotificationDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get()
    async getAllNotifications(@Res() res: Response) {
        try {
            const result = await this.notificationService.getAllNotifications();
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get(':id')
    async getNotificationById(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.notificationService.getNotificationById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Put(':id')
    async updateNotification(@Res() res: Response, @Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        try {
            const result = await this.notificationService.updateNotification(id, updateNotificationDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Delete(':id')
    async deleteNotification(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.notificationService.deleteNotification(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

}

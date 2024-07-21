import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from 'src/modules/task/task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.validate';
import { sendResponse } from 'src/utils/httpResponse.util';

@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    async createTask(@Res() res: Response, @Body() createTaskDto: CreateTaskDto) {
        try {
            const result = await this.taskService.createTask(createTaskDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Post(':id/assign')
    async assignTask(@Res() res: Response, @Param('id') id: string, @Body('userId') userId?: string, @Body('teamId') teamId?: string) {
        try {
            const result = await this.taskService.assignTask(id, userId, teamId);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Post(':id/unassign')
    async unassignTask(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.taskService.unassignTask(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Get()
    async getAllTasks(@Res() res: Response) {
        try {
            const result = await this.taskService.getAllTasks();
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Get(':id')
    async getTaskById(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.taskService.getTaskById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Get(':id/comments')
    async getComments(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.taskService.getComments(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Put(':id')
    async updateTask(@Res() res: Response, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        try {
            const result = await this.taskService.updateTask(id, updateTaskDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Delete(':id')
    async deleteTask(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.taskService.deleteTask(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

}

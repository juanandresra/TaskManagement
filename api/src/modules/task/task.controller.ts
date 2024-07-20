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
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    async getAllTasks(@Res() res: Response) {
        try {
            const result = await this.taskService.getAllTasks();
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get(':id')
    async getTaskById(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.taskService.getTaskById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Put(':id')
    async updateTask(@Res() res: Response, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        try {
            const result = await this.taskService.updateTask(id, updateTaskDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Delete(':id')
    async deleteTask(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.taskService.deleteTask(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

}

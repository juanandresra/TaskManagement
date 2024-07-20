import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskService } from 'src/modules/task/task.service';
import { Prisma } from '@prisma/client';

@Controller('tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }
}

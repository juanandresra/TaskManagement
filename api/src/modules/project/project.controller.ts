import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProjectService } from 'src/modules/project/project.service';
import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) { }
}

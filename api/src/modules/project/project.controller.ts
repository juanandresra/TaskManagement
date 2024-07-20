import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from 'src/utils/httpResponse.util';
import { ProjectService } from 'src/modules/project/project.service';
import { CreateProjectDto, UpdateProjectDto } from './project.validator';

@Controller('projects')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async createProject(@Res() res: Response, @Body() createProjectDto: CreateProjectDto) {
        try {
            const result = await this.projectService.createProject(createProjectDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get()
    async getAllProjects(@Res() res: Response) {
        try {
            const result = await this.projectService.getAllProjects();
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get(':id')
    async getProjectById(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.projectService.getProjectById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Put(':id')
    async updateProject(@Res() res: Response, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        try {
            const result = await this.projectService.updateProject(id, updateProjectDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Delete(':id')
    async deleteProject(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.projectService.deleteProject(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

}

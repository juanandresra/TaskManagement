import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { TeamService } from 'src/modules/team/team.service';
import { AssignTeamDto, CreateTeamDto, UpdateTeamDto } from './team.validate';
import { sendResponse } from 'src/utils/httpResponse.util';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('teams')
export class TeamController {

    constructor(private readonly teamService: TeamService) { }

    @UseGuards(AuthGuard)
    @Post()
    async createTeam(@Res() res: Response, @Body() createTeamDto: CreateTeamDto) {
        try {
            const result = await this.teamService.createTeam(createTeamDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Post(':id/assign')
    async assign(@Res() res: Response, @Param('id') id: string, @Body() assignDto: AssignTeamDto) {
        try {
            const result = await this.teamService.assignUser(id, assignDto.userId);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Post(':id/unassign')
    async unassign(@Res() res: Response, @Param('id') id: string, @Body() assignDto: AssignTeamDto) {
        try {
            const result = await this.teamService.unassignUser(id, assignDto.userId);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Get()
    async getAllTeams(@Res() res: Response) {
        try {
            const result = await this.teamService.getAllTeams();
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Get(':id')
    async getTeamById(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.teamService.getTeamById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateTeam(@Res() res: Response, @Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        try {
            const result = await this.teamService.updateTeam(id, updateTeamDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteTeam(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.teamService.deleteTeam(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

}

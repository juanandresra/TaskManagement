import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { TeamService } from 'src/modules/team/team.service';
import { CreateTeamDto, UpdateTeamDto } from './team.validate';
import { sendResponse } from 'src/utils/httpResponse.util';

@Controller('teams')
export class TeamController {

    constructor(private readonly teamService: TeamService) { }

    @Post()
    async createTeam(@Res() res: Response, @Body() createTeamDto: CreateTeamDto) {
        return this.teamService.createTeam(createTeamDto);
    }

    @Get()
    async getAllTeams(@Res() res: Response) {
        try {
            const result = await this.teamService.getAllTeams();
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get(':id')
    async getTeamById(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.teamService.getTeamById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Put(':id')
    async updateTeam(@Res() res: Response, @Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        try {
            const result = await this.teamService.updateTeam(id, updateTeamDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Delete(':id')
    async deleteTeam(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.teamService.deleteTeam(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

}

import { Controller, Get, Post, Body, Put, UseGuards, Req, Res, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './user.validator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Request, Response } from 'express';
import { sendResponse } from 'src/utils/httpResponse.util';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("PASO POR ACA")
            if (req['user'].role == 'user') return sendResponse(res, [await this.userService.getUserById(req['user'].id)]);
            const result = await this.userService.getUsers();
            return sendResponse(res, result.map(r => {
                return {
                    id: r.id,
                    firstName: r.firstName,
                    lastName: r.lastName,
                    email: r.email,
                    username: r.username,
                    role: r.role,
                    createdAt: r.createdAt,
                };
            }));
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getMe(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.userService.getUserById(req['user'].id);
            return sendResponse(res, {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                username: result.username,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            });
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Get(':id')
    async getUserById(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.userService.getUserById(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Roles('ADMIN','MEMBER')
    @UseGuards(AuthGuard, RoleGuard)
    @Put(':id')
    async updateUser(@Req() req: Request, @Res() res: Response, @Body() updatedUser: UpdateUserDto, @Param('id') id: string) {
        try {
            const result = await this.userService.updateUser(id, updatedUser);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Roles('ADMIN','MEMBER')
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(':id')
    async deleteUser(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<any> {
        try {
            const result = await this.userService.deleteUser(id)
            return sendResponse(res, result);
        } catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Roles('ADMIN','MEMBER')
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async createUser(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
        try {
            const result = await this.userService.createUser(createUserDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response, @Body() loginUserDto: LoginUserDto) {
        try {
            const result = await this.userService.login(loginUserDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

    @Post('register')
    async register(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
        try {
            const result = await this.userService.register(createUserDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    }

}

import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
}

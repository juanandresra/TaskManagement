import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommentService } from 'src/modules/comment/comment.service';
import { Prisma } from '@prisma/client';

@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ) { }
}

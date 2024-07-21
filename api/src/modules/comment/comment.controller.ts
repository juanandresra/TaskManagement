import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from 'src/utils/httpResponse.util';
import { CommentService } from 'src/modules/comment/comment.service';
import { Comment, Prisma } from '@prisma/client';
import { CreateCommentnDto, UpdateCommentDto } from './comment.validator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('comments')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

    @UseGuards(AuthGuard)
    @Post()
    async createComment(@Res() res: Response, @Req() req: Response, @Body() createCommentDto: CreateCommentnDto) {
        try {
            const result = await this.commentService.createComment({ ...createCommentDto, userId: req['user'].id });
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateComment(@Res() res: Response, @Req() req: Response, @Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        try {
            const result = await this.commentService.updateComment(id, updateCommentDto, req['user'].id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteComment(@Res() res: Response, @Req() req: Response, @Param('id') id: string) {
        try {
            const result = await this.commentService.deleteComment(id, req['user'].id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

}

import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from 'src/utils/httpResponse.util';
import { CommentService } from 'src/modules/comment/comment.service';
import { Comment, Prisma } from '@prisma/client';
import { CreateCommentnDto, UpdateCommentDto } from './comment.validator';

@Controller('comments')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

    @Post()
    async createComment(@Res() res: Response, @Body() createCommentDto: CreateCommentnDto) {
        try {
            const result = await this.commentService.createComment(createCommentDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Put(':id')
    async updateComment(@Res() res: Response, @Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        try {
            const result = await this.commentService.updateComment(id, updateCommentDto);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

    @Delete(':id')
    async deleteComment(@Res() res: Response, @Param('id') id: string) {
        try {
            const result = await this.commentService.deleteComment(id);
            return sendResponse(res, result);
        }
        catch (error) { return sendResponse(res, null, error.status, error.message || error); }
    };

}

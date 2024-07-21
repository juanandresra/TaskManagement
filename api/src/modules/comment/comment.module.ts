import { Module } from '@nestjs/common';
import { CommentService } from 'src/modules/comment/comment.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { CommentController } from 'src/modules/comment/comment.controller';
import { CommentGateway } from './comment.gateway';

@Module({
    imports: [PrismaModule],
    controllers: [CommentController],
    exports: [CommentService],
    providers: [ CommentGateway, CommentService ]
})
export class CommentModule { }
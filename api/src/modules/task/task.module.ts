import { Module } from '@nestjs/common';
import { TaskService } from 'src/modules/task/task.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { TaskController } from 'src/modules/task/task.controller';

@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    exports: [TaskService],
    providers: [ TaskService ]
})
export class TaskModule { }
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules

import { CommentModule } from 'src/modules/comment/comment.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { ProjectModule } from 'src/modules/project/project.module';
import { TaskModule } from 'src/modules/task/task.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    CommentModule,
    NotificationModule,
    ProjectModule,
    TaskModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ]
})
export class AppModule { }

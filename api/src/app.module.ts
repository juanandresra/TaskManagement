import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Modules

import { CommentModule } from 'src/modules/comment/comment.module';
import { ProjectModule } from 'src/modules/project/project.module';
import { TaskModule } from 'src/modules/task/task.module';
import { UserModule } from 'src/modules/user/user.module';
import { TeamModule } from './modules/team/team.module';

const configService = new ConfigService({ envFilePath: '.env' });

@Module({
  imports: [
    TeamModule,
    CommentModule,
    ProjectModule,
    TaskModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }
    })
  ]
})
export class AppModule { }

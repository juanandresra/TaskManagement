import { Module } from '@nestjs/common';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ProjectController } from 'src/modules/project/project.controller';

@Module({
    imports: [PrismaModule],
    controllers: [ProjectController],
    exports: [ProjectService],
    providers: [ ProjectService ]
})
export class ProjectModule { }
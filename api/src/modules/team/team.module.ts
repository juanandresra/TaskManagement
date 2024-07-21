import { Module } from '@nestjs/common';
import { TeamService } from 'src/modules/team/team.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { TeamController } from 'src/modules/team/team.controller';

@Module({
    imports: [PrismaModule],
    controllers: [TeamController],
    exports: [TeamService],
    providers: [ TeamService ]
})
export class TeamModule { }
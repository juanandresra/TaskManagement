import { Module } from '@nestjs/common';
import { NotificationService } from 'src/modules/notification/notification.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { NotificationController } from 'src/modules/notification/notification.controller';

@Module({
    imports: [PrismaModule],
    controllers: [NotificationController],
    exports: [NotificationService],
    providers: [ NotificationService ]
})
export class NotificationModule { }
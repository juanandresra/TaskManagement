import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { UserController } from 'src/modules/user/user.controller';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    exports: [UserService],
    providers: [ UserService ]
})
export class UserModule { }
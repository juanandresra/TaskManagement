import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectService {

    constructor(private prisma: PrismaService) { }

}
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { $Enums, Prisma, User } from '@prisma/client';
import { LoginUserDto } from './user.validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async createUser(user: Prisma.UserCreateInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return this.prisma.user.create({ data: { ...user, password: hashedPassword } })
    }

    async getUsers(): Promise<any[]> {
        return this.prisma.user.findMany({
            select: { id: true, email: true, password: true, firstName: true, lastName: true, createdAt: true, updatedAt: true, role: true }
        });
    }

    async getUserById(id: string): Promise<any | null> {
        return this.prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, password: true, firstName: true, lastName: true, createdAt: true, updatedAt: true, role: true }
        });
    }

    async getUserByIdentifier(identifier: string): Promise<User | null> {
        return this.prisma.user.findFirstOrThrow({ where: { email: identifier } });
    }

    async updateUser(id: string, body: { firstName: string, lastName: string, role: $Enums.Role, password?: string }): Promise<any | null> {
        if (body.password) body.password = await bcrypt.hash(body.password, 10);
        const updateUser = this.prisma.user.update({ where: { id }, data: body });
        if (!updateUser) { throw new NotFoundException('El usuario no existe'); };
        return updateUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        const countUsers = await this.prisma.user.count();
        if (countUsers < 2) { throw new ConflictException('No se puede eliminar el último usuario'); }
        const deletedUser = await this.prisma.user.delete({ where: { id } });
        return !!deletedUser;
    }

    async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
        const user = await this.prisma.user.findFirst({ where: { email: loginUserDto.identifier } });
        if (!user) { throw new UnauthorizedException('Usuario no encontrado'); }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) { throw new UnauthorizedException('Contraseña equivocada'); }
        return { token: this.jwtService.sign({ id: user.id }) };
    }

    async register(user: Prisma.UserCreateInput): Promise<{ token: string }> {
        if (await this.prisma.user.count({ where: { email: user.email } })) { throw new ConflictException('El email ya existe'); }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await this.prisma.user.create({ data: { ...user, password: hashedPassword } });
        return { token: this.jwtService.sign({ id: result.id }) };
    }

}

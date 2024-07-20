import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { $Enums } from "@prisma/client";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const roles = this.reflector.get<$Enums.Role[]>('roles', context.getHandler());
            if (!roles) { return true; }
            if (!roles.some((role) => role === context.switchToHttp().getRequest().user.role || '')) {
                throw new UnauthorizedException('No tiene permisos para realizar esta acción');
            }
        } catch (error) {
            throw new UnauthorizedException('No tiene permisos para realizar esta acción');
        }
        return true;
    }

}
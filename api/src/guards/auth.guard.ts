import { Injectable, ExecutionContext, UnauthorizedException, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable({})
export class AuthGuard {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { };

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) { throw new UnauthorizedException('Por favor inicie sesion nuevamente'); }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userService.getUserById(payload.id);
            if (!user) { throw new UnauthorizedException(); }
            request.user = { id: user.id, email: user.email, username: user.username, role: user.role };
        }
        catch (error) { throw new UnauthorizedException('Por favor inicie sesion nuevamente'); }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers['authorization'];
        const [type, token] = authorizationHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}

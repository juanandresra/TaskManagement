import { Logger } from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

const users: { tokenId: string, userId: string }[] = [];

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'comments' })
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    afterInit(server: any) { this.logger.log('Init CommentGateway'); }

    @WebSocketServer() server: Server;

    private logger: Logger = new Logger(CommentGateway.name);
    
    async handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any): void {
        const userIndex = users.findIndex(u => u.tokenId === client.id);
        if (userIndex !== -1) users.splice(userIndex, 1);
    }

    @SubscribeMessage('join-user')
    async joinUser(client: any, data: { userId: string }) {
        const userIndex = users.findIndex(u => u.tokenId === client.id);
        if (userIndex!== -1) users.splice(userIndex, 1);
        users.push({ tokenId: client.id, userId: data.userId });
    }

    emitNotification(message: string, userId: string[]): void {
        const usersF = users.filter(u => userId.includes(u.userId)).map(u => u.tokenId);
        usersF.forEach(u => this.server.to(u).emit('notification', { message }));
    }

}
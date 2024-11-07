import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor() {
    console.log('ChatGateway created');
    console.log('server', this.server);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.join(room);
    console.log('you have joined room ' + room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.leave(room);
    console.log('you have left room' + room);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { room: string, message: string}, @ConnectedSocket() client: Socket): void {
    console.log('message', data);
    this.server.emit('message', data.message);
  }
}

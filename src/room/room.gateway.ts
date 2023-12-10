import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class RoomGateway {
  @SubscribeMessage('helloWorld')
  handleMessage(client: any, payload: any) {
    console.log('payload', payload);
    client.emit('helloWorld', { data: 'Hello World From Server' });
  }
}

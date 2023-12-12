import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class RoomGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('helloWorld')
  handleMessage(client: any, payload: any) {
    console.log('payload', payload);
    client.emit('helloWorld', { data: 'Hello World From Server' });
  }

  @SubscribeMessage('joinTripLocationLive')
  handleJoinTripLocationLive(
    @MessageBody() data: { tripId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { tripId } = data;

    // join the client to the trip channel (room)
    client.join(`${tripId}`);

    // notify the client that they have successfully joined the channel
    client.emit(
      'tripChannelJoined',
      `You have joined the trip channel for Trip ID: ${tripId}`,
    );
  }

  @SubscribeMessage('liveLocationOfTrip')
  handleLiveLocation(
    @MessageBody()
    data: {
      longitute: number;
      latitute: number;
      tripId: number;
    },
  ) {
    //save to dabatase
    console.log('liverLocationCommingFromClient', data);

    //notify new location
    this.server.to(`${data.tripId}`).emit('liveLocationUpdate', data);
  }
}

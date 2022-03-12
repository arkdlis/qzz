import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Observable, map, from, shareReplay } from 'rxjs';
import { interpret } from 'xstate';
import { gameMachine } from './trivia/xstate/quiz.xstate';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  gameService = interpret(gameMachine);
  state$ = from(this.gameService).pipe(shareReplay(0));

  constructor() {
    this.gameService.start();
    // this.state$.subscribe(v => console.log('ctor', v));
  }
 
  @SubscribeMessage('events')
  onEvent(@MessageBody() data: any): Observable<WsResponse<any>> {
    console.log('data', data);
    if (data.event === 'sub') {
      return this.state$.pipe(
        // take(1),
        map(data => ({ event: 'events', data: {
          value: data.value,
          context: data.context,
        } }))
      );
    } else {
      this.gameService.send(data.event, data.value);
    }
  }
}
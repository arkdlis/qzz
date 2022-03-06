import { Scope } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Observable, map, Subject, count, shareReplay, tap, BehaviorSubject, take, scan, from } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  increase$ = new BehaviorSubject(0)
  counter$ = this.increase$.pipe(
    scan((acc, val) => acc + 1),
    tap(x => console.log('stream', x)),
    shareReplay(0)
  )

  constructor() {
    this.counter$.subscribe(v => console.log('ctor', v))
  }
 
  @SubscribeMessage('events')
  onEvent(@MessageBody() data: string): Observable<WsResponse<string>> {
    console.log('data', data)
    if (data === 'sub') {
      return this.counter$.pipe(
        // take(1),
        map(counter => ({ event: 'events', data: counter.toString() })),
      );
    }
    if (data === 'inc') {
      this.increase$.next(1);
      return;
    }
    return from([{ event: 'events', data }])
  }
}
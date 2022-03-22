import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Observable, map, from, shareReplay } from 'rxjs';
import { EventData, interpret } from 'xstate';
import { GameEvent, gameMachine, GameTypestate } from './trivia/xstate/quiz.xstate';

type EventDTO = {
  event: GameEvent['type'] | 'HOST' | 'JOIN'
  value: EventData
  gameId?: number
}

type GameStateDTO = {
  id: string
  name: string
  gameId: number
  value: GameTypestate['value']
  context: GameTypestate['context']
}

class Game {
  gameService = interpret(gameMachine);
  state$ = from(this.gameService).pipe(shareReplay(0));

  constructor() {
    this.gameService.start();
  }

  send(event: GameEvent['type'], value: EventData) {
    this.gameService.send(event, value);
  }

  getState$() {
    return this.state$;
  }
}

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  nextId = 1;
  nextHostId = 1;

  games: { [key: number ]: Game } = {}
 
  @SubscribeMessage('events')
  onEvent(@MessageBody() data: EventDTO): Observable<WsResponse<GameStateDTO>> | void {
    console.log('data', data);
    if (data.event === 'HOST') {
      return this.createHostAndSubscribe(data)
    } else if (data.event === 'JOIN') {
      return this.subscribeToHost(data)
    } else {
      const gameInstance = this.games[data.gameId];
      gameInstance.send(data.event, data.value);
    }
  }

  createHostAndSubscribe(data: EventDTO): Observable<WsResponse<GameStateDTO>> {
    const id = data.value?.id || this.nextId++;
    const gameId = this.nextHostId++;
    const gameInstance = this.games[gameId] = new Game();
    return gameInstance.state$.pipe(
      map(data => ({ event: 'events', data: {
        id: id,
        gameId: gameId,
        name: `Player${id}`,
        value: data.value as GameTypestate['value'],
        context: data.context,
      } }))
    );
  }

  subscribeToHost(data: EventDTO): Observable<WsResponse<GameStateDTO>> {
    const id = data.value?.id || this.nextId++;
    const gameId = data.value?.gameId;
    const gameInstance = this.games[gameId];
    return gameInstance.state$.pipe(
      map(data => ({ event: 'events', data: {
        id: id,
        gameId: gameId,
        name: `Player${id}`,
        value: data.value as GameTypestate['value'],
        context: data.context,
      } }))
    );
  }
}
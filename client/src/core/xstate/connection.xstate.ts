import { io } from 'socket.io-client';
import { assign, createMachine, send } from 'xstate';
import { Player } from '../../core/game.model';
import { GameState } from '../trivia.state';

type Event =
  | { type: 'JOIN', id: string | null, gameId: number }
  | { type: 'HOST' }
  | { type: 'RECEIVED_MESSAGE', state: any }
  | { type: 'SEND_MESSAGE', message: string, value: any }

type Typestate = 
  | { value: 'idle', context: Context }
  | { value: 'connected', context: Context }

type Context = {
  isHost: boolean | null
  player: Player
  gameState?: GameState
}

export const gameMachine = createMachine<Context, Event, Typestate>({
  id: 'root',
  initial: 'idle',
  context: {
    isHost: null,
    player: {
      id: 0,
      name: 'PlayerOne'
    },
  },
  states: {
    idle: { on: {
      JOIN: {
        target: 'connected',
        actions: [
          assign({ isHost: (c, e) => false }),
          send((context, event) => ({
            type: 'SEND_MESSAGE',
            message: 'JOIN',
            value: {
              id: event.id,
              gameId: event.gameId,
            }
          }))
        ]
      },
      HOST: {
        target: 'connected',
        actions: [
          assign({ isHost: (c, e) => true }),
          send((context, event) => ({
            type: 'SEND_MESSAGE',
            message: 'HOST',
          }))
        ]
      },
    } },
    connected: { },
  },
  on: {
    RECEIVED_MESSAGE: {
      actions: [
        (context, event) => {
          console.log(event)
        },
        assign({ gameState: (c, e) => e.state }),
      ]
    },
    SEND_MESSAGE: {
      actions: [
        send((context, event) => ({
          type: 'SEND_MESSAGE',
          message: event.message,
          value: event.value,
          gameId: context.gameState?.gameId
        }), { to: 'socket' }),
      ]
    }
  },
  invoke: {
    id: 'socket',
    src: (context, event) => (callback, onReceive) => {
      const newSocket = io(`http://localhost:4000`);
      const messageListener = (message: any) => {
        callback({ type: 'RECEIVED_MESSAGE', state: message })
      }
      newSocket.on('events', messageListener);

      onReceive((e: {
        type: string
        message: string
        value: any
        gameId?: number
      }) => {
        if (e.type === 'SEND_MESSAGE') {
          newSocket?.emit('events', {event: e.message, value: e.value, gameId: e.gameId});
        }
      })
      
      return () => {
        newSocket.off('events', messageListener);
        newSocket.close()
      };
    }
  },
});

/*

     ___________________
    |             create|
    |                   |
    |  join with code   |
    |                   |
    |                   |


- enter -> create game
  - (share link)
  - (share code)
  - create user -> join
  - start (with confirmation) // host can start a game and not be a player
- enter with link | enter -> join with code
  - create user -> join
  - (wait for host to start)
  - (join already started game)
- connection error
- reconnect -> (try again button | enter with link | enter -> join with code) -> read from local storage
- game ended
  - close | start again

*/
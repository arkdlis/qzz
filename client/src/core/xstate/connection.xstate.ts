import { io, Socket } from 'socket.io-client';
import { createMachine } from 'xstate';
import { Player } from '../../core/game.model';

class SocketWrapper {
  connection: Socket | undefined

  openConnection() {
    const newSocket = io(`http://localhost:4000`);
    this.connection = newSocket
    return 
  }
  closeConnection() {
    if (!this.connection) return
    this.connection.close()
    this.connection = undefined
  };
  send(ev: string, ...args: any[]) {
    if (!this.connection) return
    this.connection.emit('events', args);
  }
  listen(ev: string, listener: (...args: any[]) => void) {
    if (!this.connection) return
    this.connection.on('events', listener);
  }
  removeListener(ev: string, listener: (...args: any[]) => void) {
    if (!this.connection) return
    this.connection.off('events', listener);
    this.connection.disconnect()
  }
}

type Event =
  | { type: 'CONNECT' }

type Typestate = 
  | { value: 'idle', context: Context }
  | { value: 'final_ranking', context: Context }

type Context = {
  players: { [key: string]: Player }
}

export const gameMachine = createMachine<Context, Event, Typestate>({
  id: 'connection',
  initial: 'idle',
  context: {
    players: {},
  },
  states: {
    idle: { on: {
      CONNECT: {
        target: 'connected',
        actions: [
          (context, event) => {
            
          }
        ]
      },
    } },
    connected: { type: 'final' },
  }
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
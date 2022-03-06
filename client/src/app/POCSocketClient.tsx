import { FormEvent, useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Player } from '../core/game.model';
import { WaitingRoom } from '../trivia/views/WaitingRoom';

const useSocket = (messageListener: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    newSocket.on('events', messageListener);
    setSocket(newSocket);
    return () => {
      newSocket.off('events', messageListener);
      newSocket.close()
    };
  }, [setSocket, messageListener]);

  const send = useCallback((event: string, value: any = {}) => {
    socket?.emit('events', {event, value});
  }, [socket]);

  return [socket, send] as const
}

export function SocketClientTest() {
  const [user] = useState<Player>({
    id: 'X',
    name: 'PlayerOne'
  })
  const [isHost] = useState(true)

  const [messages, setMessages] = useState<string[]>([]);
  const callback = useCallback((message: string) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, JSON.stringify(message)];
      return newMessages;
    });
  }, [setMessages])
  const [socket, send] = useSocket(callback)

  return (
    <div className="App">
      { socket ? (
        <div className="chat-container">
          <div className="message-list">
            {messages.map(m => (
              <div>{m}</div>
            ))}
          </div>
          <WaitingRoom
            isHost={isHost}
            players={{}}
            onReady={() => send('PLAYER_IS_READY', { player: user })}
            onStart={() => send('LETS_START')}
          />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

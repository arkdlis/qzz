import { useCallback, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (messageListener: any) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    console.log('connect')
    const newSocket = io(`http://localhost:4000`);
    newSocket.on('events', messageListener);
    socket.current = newSocket;
    return () => {
      newSocket.off('events', messageListener);
      newSocket.close()
    };
  }, [messageListener]);

  const send = useCallback((event: string, value: any = {}) => {
    socket.current?.emit('events', {event, value});
  }, []);

  return [socket, send] as const
}
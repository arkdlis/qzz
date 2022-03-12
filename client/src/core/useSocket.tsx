import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (messageListener: any) => {
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
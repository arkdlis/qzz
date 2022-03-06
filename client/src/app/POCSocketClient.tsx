import { FormEvent, useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

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

  const send = useCallback((value: any) => {
    socket?.emit('events', value);
  }, [socket]);

  return [socket, send]
}

const MessageInput = ({onSubmit}: {onSubmit: any}) => {
  const [value, setValue] = useState('');
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };
  
  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};


export function SocketClientTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const callback = useCallback((message: string) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, message];
      return newMessages;
    });
  }, [setMessages])
  const [socket, send] = useSocket(callback)

  return (
    <div className="App">
      <header className="app-header">
        React Chat
      </header>
      { socket ? (
        <div className="chat-container">
          <MessageInput onSubmit={send} />
          <div className="message-list">
            {messages.map(m => (
              <div>{m}</div>
            ))}
          </div>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

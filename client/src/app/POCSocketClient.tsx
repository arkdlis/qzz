import { FormEvent, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const MessageInput = ({socket}: {socket: Socket}) => {
  const [value, setValue] = useState('');
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('events', value);
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

function Messages({socket}: {socket: Socket}) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const messageListener = (message: string) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        return newMessages;
      });
    };
    
    socket.on('events', messageListener);

    return () => {
      socket.off('events', messageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {messages.map(m => (
        <div>{m}</div>
      ))}
    </div>
  );
}

export function SocketClientTest() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => {newSocket.close()};
  }, [setSocket]);

  return (
    <div className="App">
      <header className="app-header">
        React Chat
      </header>
      { socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

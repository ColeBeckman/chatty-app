import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@clerk/nextjs';

type Message = string;

function useChatroom() {
  const [socketConnection, setSocketConnection] = useState<Socket>();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const connectToSocket = async () => {
      const token = await getToken();
      const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
        query: { token },
      });
      setSocketConnection(socket);
      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    };
    connectToSocket();
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const sendMessage = () => {
    socketConnection?.emit('message', currentMessage);
    setCurrentMessage('');
  };

  return {
    messages,
    socketConnection,
    sendMessage,
    currentMessage,
    setCurrentMessage,
  };
}

export default useChatroom;

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@clerk/nextjs';

type Message = {
  id: number;
  message: string;
  user_id: string;
  user_name: string;
  user_image: string;
  created_at: Date;
  updated_at: Date;
};

function useChatroom(defaultMessages: [], roomName: string) {
  const [socketConnection, setSocketConnection] = useState<Socket>();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const { getToken } = useAuth();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('join', roomName);
    }
    return () => {
      console.log('Leaving');
    };
  }, [roomName, socketConnection]);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = await getToken();
      socket.emit('authenticate', token);
    };
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    setSocketConnection(socket);
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    authenticateUser();
    return () => {
      socket?.disconnect();
    };
  }, [getToken]);

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

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

let socket: Socket;

function useChatroom(defaultMessages: [], roomName: string) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const { getToken } = useAuth();

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    }

    if (socket) {
      socket.on('newMessage', (message) => {
        console.log(message, 'message');
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    const authenticateUser = async () => {
      const token = await getToken();
      socket.emit('authenticate', token);
    };
    authenticateUser();

    socket.emit('join', roomName);

    return () => {
      socket.emit('leave', roomName);
    };
  }, [getToken, roomName]);

  const sendMessage = () => {
    socket.emit('message', currentMessage);
    setCurrentMessage('');
  };

  return {
    messages,
    sendMessage,
    currentMessage,
    setCurrentMessage,
  };
}

export default useChatroom;

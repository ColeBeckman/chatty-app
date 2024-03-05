import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';

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
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    }

    if (socket) {
      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
      });
    }

    const authenticateUser = async () => {
      const token = await getToken();
      socket.emit('authenticate', token, () => {
        socket.emit('join', roomName, (socketUsers: User[]) => {
          setConnectedUsers(socketUsers);
        });
      });
    };
    authenticateUser();

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
    connectedUsers,
  };
}

export default useChatroom;

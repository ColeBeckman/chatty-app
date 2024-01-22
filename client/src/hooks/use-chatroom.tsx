import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = string;

function useChatroom() {
  const [socketConnection, setSocketConnection] = useState<Socket>();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    setSocketConnection(socket);
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // Send the message to the server
    socketConnection?.emit('message', currentMessage);
    // Clear the currentMessage state
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

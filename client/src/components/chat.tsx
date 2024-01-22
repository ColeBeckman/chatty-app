'use client';
import useChatroom from '@/hooks/use-chatroom';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

const Chat = () => {
  const { messages, sendMessage, currentMessage, setCurrentMessage } =
    useChatroom();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div>
      {/* Display the messages */}
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <form onSubmit={handleSubmit}>
        {/* Input field for sending new messages */}
        <Input
          type="text"
          placeholder="Enter Message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />

        {/* Button to submit the new message */}
        <Button>Send Message</Button>
      </form>
    </div>
  );
};

export default Chat;

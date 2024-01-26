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
    <div className="flex items-end max-h-[600px] border rounded-md h-screen w-96">
      {/* Display the messages */}
      <div>
        {messages.map((message: string, index: number) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 w-full">
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

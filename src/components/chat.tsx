'use client';
import useChatroom from '@/hooks/use-chatroom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Bubble from '@/components/ui/bubble';
import { ScrollArea } from './ui/scroll-area';

const Chat = () => {
  const { messages, sendMessage, currentMessage, setCurrentMessage } =
    useChatroom();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className="flex flex-col justify-end items-start max-h-[700px] border rounded-md h-screen max-w-[800px] w-full">
      <ScrollArea className="flex px-3 w-full py-6">
        <ul className="flex flex-col gap-2.5">
          {messages.map((message: string, index: number) => (
            <Bubble
              key={index}
              message={message}
              name="Cole"
              timestamp={time}
            />
          ))}
        </ul>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 flex-col p-4 w-full border rounded-sm"
      >
        <Input
          type="text"
          placeholder="Enter Message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />

        <Button>Send Message</Button>
      </form>
    </div>
  );
};

export default Chat;

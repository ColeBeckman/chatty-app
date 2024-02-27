'use client';
import useChatroom from '@/hooks/use-chatroom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Bubble from '@/components/ui/bubble';
import useScrollToBottom from '@/hooks/scroll-to-bottom';

interface Props {
  userId: string;
  serverMessages: [];
}
const Chat = (props: Props) => {
  const { serverMessages, userId } = props;
  const { messages, sendMessage, currentMessage, setCurrentMessage } =
    useChatroom(serverMessages);
  const ulRef = useScrollToBottom(messages);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col justify-end items-start max-h-[700px] border rounded-md h-screen max-w-[800px] w-full">
      <ul
        className="flex flex-col h-full gap-2.5 w-full p-2 overflow-y-auto"
        ref={ulRef}
      >
        {messages.map((message) => (
          <Bubble
            messageUserId={message.user_id}
            currentUserId={userId}
            key={message.id}
            message={message.message}
            name={message.user_name}
            timestamp={message.created_at}
            userImage={message.user_image}
            userName={message.user_name}
          />
        ))}
      </ul>
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

        <Button disabled={!currentMessage.trim()}>Send Message</Button>
      </form>
    </div>
  );
};

export default Chat;

'use client';
import { usePathname } from 'next/navigation';
import useChatroom from '@/hooks/use-chatroom';
import useScrollToBottom from '@/hooks/scroll-to-bottom';

import Bubble from '@/components/ui/bubble';
import ChatForm from './chat-form/chat-form';

interface Props {
  userId: string;
  serverMessages: [];
}
const Chat = (props: Props) => {
  const { serverMessages, userId } = props;
  const pathName = usePathname();
  const roomName = pathName.split('/')[1];
  const { messages, sendMessage, currentMessage, setCurrentMessage } =
    useChatroom(serverMessages, roomName);
  const ulRef = useScrollToBottom(messages);

  return (
    <div className="flex max-w-[800px] w-full">
      <div className="flex flex-col justify-end items-start max-h-[700px] border rounded-md h-screen w-full">
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
        <ChatForm
          sendMessage={sendMessage}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

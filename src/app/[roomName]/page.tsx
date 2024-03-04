import db from '@db';

import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

import Chat from '@/components/chat';
import ChatRooms from '@/components/chat-rooms/chat-rooms';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const getMessages = (roomName: string) => {
  return db
    .select('*')
    .from('messages')
    .join('chat_rooms', 'chat_rooms.id', 'messages.chat_room_id')
    .where({ room_name: roomName });
};

interface Props {
  params: { roomName: string };
}
export default async function Home(props: Props) {
  const { params } = props;
  const user: User = (await currentUser()) as User;
  const messages = await getMessages(params.roomName);
  return (
    <div className="flex h-screen items-center">
      <div className="flex flex-col items-center max-w-[180px] w-full h-full bg-background-darker">
        <h3 className="flex gap-1 text-lg items-center font-bold justify-center py-3.5 w-full bg-card">
          <IoChatbubblesOutline />
          Chat Rooms
        </h3>
        <ChatRooms />
        <div className="flex mt-auto w-full p-4 justify-between bg-card">
          <UserButton afterSignOutUrl="/signIn" />
          <ThemeSwitcher />
        </div>
      </div>
      <Chat serverMessages={messages} userId={user.id} />
    </div>
  );
}

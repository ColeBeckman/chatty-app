import db from '@db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Chat from '@/components/chat';
import NavBar from '@/components/nav-bar';
import ChatRooms from '@/components/chat-rooms/chat-rooms';

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
    <div className="flex justify-center h-screen items-center">
      <NavBar />
      <div className="max-w-[125px] w-full max-h-[700px] h-full">
        <h2>Chat Rooms</h2>
        <ChatRooms />
      </div>
      <Chat serverMessages={messages} userId={user.id} />
    </div>
  );
}

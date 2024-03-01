import { ChatRoomType } from '@/types';
import ChatRoom from './chat-room';
import db from '@db';

const getRooms = () => {
  return db.select('*').from('chat_rooms');
};

const ChatRooms = async () => {
  const rooms = await getRooms();
  return (
    <ul className="flex flex-col gap-1 w-full pl-3 mt-2.5">
      {rooms.map((room: ChatRoomType) => {
        return <ChatRoom key={room.id} room={room} />;
      })}
    </ul>
  );
};

export default ChatRooms;

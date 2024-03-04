import { ChatRoomType } from '@/types';
import ChatRoom from './chat-room';
import db from '@db';

const getRooms = () => {
  return db.select('*').from('chat_rooms');
};

const ChatRooms = async () => {
  const rooms = await getRooms();
  return (
    <div className="w-full">
      <ul className="flex flex-col w-full mt-2.5">
        {rooms.map((room: ChatRoomType) => {
          return <ChatRoom key={room.id} room={room} />;
        })}
      </ul>
    </div>
  );
};

export default ChatRooms;

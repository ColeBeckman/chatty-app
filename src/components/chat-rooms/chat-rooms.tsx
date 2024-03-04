import { ChatRoomType } from '@/types';
import ChatRoom from './chat-room';
import db from '@db';

const getRooms = () => {
  return db.select('*').from('chat_rooms');
};

interface Props {
  currentRoomName: string;
}

const ChatRooms = async (props: Props) => {
  const { currentRoomName } = props;
  const rooms = await getRooms();
  return (
    <div className="w-full">
      <ul className="flex flex-col gap-2 w-full p-3.5">
        {rooms.map((room: ChatRoomType) => {
          return (
            <ChatRoom
              key={room.id}
              room={room}
              currentRoomName={currentRoomName}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ChatRooms;

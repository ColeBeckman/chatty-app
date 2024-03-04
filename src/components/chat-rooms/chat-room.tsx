import { ChatRoomType } from '@/types';
import Link from 'next/link';
import { LuDoorOpen, LuDoorClosed } from 'react-icons/lu';

interface Props {
  room: ChatRoomType;
}
const ChatRoom = (props: Props) => {
  const { room } = props;
  return (
    <li className="flex text-lg justify-center items-center">
      <LuDoorClosed className="ml-1" />
      <Link className="ml-1" href={`/${room.room_name}`}>
        {room.room_name}
      </Link>
    </li>
  );
};

export default ChatRoom;

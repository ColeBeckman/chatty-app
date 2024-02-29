import { ChatRoomType } from '@/types';
import Link from 'next/link';

interface Props {
  room: ChatRoomType;
}
const ChatRoom = (props: Props) => {
  const { room } = props;
  return (
    <li>
      <Link href={`/${room.room_name}`}>{room.room_name}</Link>
    </li>
  );
};

export default ChatRoom;

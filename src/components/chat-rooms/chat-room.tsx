import { ChatRoomType } from '@/types';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  room: ChatRoomType;
  currentRoomName: string;
}

const ChatRoom = (props: Props) => {
  const { room, currentRoomName } = props;

  const isActiveRoom = currentRoomName === room.room_name;
  const style = classNames('ml-1 hover:text-accent', {
    'text-accent': isActiveRoom,
  });

  return (
    <li className="flex text-lg items-center ">
      <Link className={style} href={`/${room.room_name}`}>
        {room.room_name}
      </Link>
    </li>
  );
};

export default ChatRoom;

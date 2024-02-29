import { ChatRoomType } from '@/types';

interface Props {
  room: ChatRoomType;
}
const ChatRoom = (props: Props) => {
  const { room } = props;
  return <li>{room.room_name}</li>;
};

export default ChatRoom;

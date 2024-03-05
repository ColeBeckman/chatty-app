import { User } from '@clerk/nextjs/server';
import { FaUsers } from 'react-icons/fa';

interface Props {
  connectedUsers: User[];
}

const ActiveUsers = (props: Props) => {
  const { connectedUsers } = props;
  return (
    <>
      <h3 className="flex items-center gap-1 text-lg font-bold p-3.5 w-full bg-card">
        <FaUsers />
        Active Users
      </h3>
      <ul className="flex flex-col gap-2 w-full p-3.5">
        {connectedUsers.map((user) => {
          return (
            <li className="flex text-lg items-center" key={user.id}>
              {user.firstName}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ActiveUsers;

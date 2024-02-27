import { currentUser } from '@clerk/nextjs';
import Chat from '@/components/chat';
import NavBar from '@/components/nav-bar';
import { User } from '@clerk/nextjs/server';
import db from '@db';

const getMessages = () => {
  return db.select('*').from('messages');
};

export default async function Home() {
  const user: User = (await currentUser()) as User;
  const messages = await getMessages();
  return (
    <div className="flex justify-center h-screen items-center">
      <NavBar />
      <Chat serverMessages={messages} userId={user.id} />
    </div>
  );
}

import { currentUser } from '@clerk/nextjs';
import Chat from '@/components/chat';
import NavBar from '@/components/nav-bar';
import { User } from '@clerk/nextjs/server';

export default async function Home() {
  const user: User | null = await currentUser();
  console.log(user);
  return (
    <div className="flex justify-center h-screen items-center">
      <NavBar />
      <Chat
        userName={user?.firstName}
        userImage={user?.imageUrl}
        userId={user?.id}
      />
    </div>
  );
}

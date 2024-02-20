'use client';
import Chat from '@/components/chat';
import NavBar from '@/components/nav-bar';

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center">
      <NavBar />
      <Chat />
    </div>
  );
}

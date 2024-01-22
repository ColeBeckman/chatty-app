'use client';
import { useState } from 'react';
import Chat from '@/components/chat';
import { Button } from '@/components/ui/button';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleDarkMode = isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />;
  return (
    <div>
      <Button variant="outline" size="icon" onClick={handleDarkMode}>
        {toggleDarkMode}
      </Button>
      <Chat />
    </div>
  );
}

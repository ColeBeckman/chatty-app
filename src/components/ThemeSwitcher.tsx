'use client';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { Button } from './ui/button';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={`p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-primary dark:bg-primary`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? <MdDarkMode /> : <MdOutlineDarkMode />}
    </Button>
  );
};

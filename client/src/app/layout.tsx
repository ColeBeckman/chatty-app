import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/theme-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chatty App',
  description: 'App to chat in realtime with other users',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background dark:background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          <main className="h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

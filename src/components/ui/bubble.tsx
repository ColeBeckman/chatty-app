'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface Props {
  message: string;
  name?: string | null;
  timestamp: string;
  userImage?: string;
  userName?: string | null;
}
const Bubble = (props: Props) => {
  const { message, name, timestamp, userImage, userName } = props;

  const fallback = name?.charAt(0);

  return (
    <li dir="rtl" className="flex items-start gap-2.5 first:mt-auto">
      <Avatar>
        <AvatarImage src={userImage} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col leading-1.5 p-2 border-gray-200 bg-accent rounded-e-xl rounded-es-xl dark:bg-accent max-w-full">
        <div className="items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-normal mr-[5px]">{userName}</span>
          <span className="text-xs font-thin">{timestamp}</span>
        </div>
        <p className="text-sm font-light py-2.5 break-all">{message}</p>
      </div>
    </li>
  );
};

export default Bubble;

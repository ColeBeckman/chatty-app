'use client';

import React from 'react';
import Image from 'next/image';

const classNames = require('classnames');

interface Props {
  message: string;
  name?: string | null;
  timestamp: Date;
  userImage: string;
  userName?: string | null;
  currentUserId: string;
  messageUserId: string;
}
const Bubble = (props: Props) => {
  const {
    message,
    name,
    timestamp,
    userImage,
    userName,
    currentUserId,
    messageUserId,
  } = props;
  const date = new Date(timestamp);
  const isRtl = currentUserId === messageUserId;
  const style = classNames('flex items-start gap-2.5', {
    'ml-auto flex-row-reverse ': isRtl,
  });
  const bubbleStyle = classNames(
    'flex flex-col leading-1.5 p-2 border-gray-200 bg-accent dark:bg-accent max-w-full',
    {
      'rounded-b-xl rounded-l-xl': isRtl,
      'rounded-e-xl rounded-es-xl': !isRtl,
    },
  );
  return (
    <li className={style}>
      <div className="relative rounded-full w-[40px] h-[40px] overflow-hidden">
        <Image fill src={userImage} alt={`${userName}'s profile picture`} />
      </div>
      <div className={bubbleStyle}>
        <div className="items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-normal mr-[5px]">{userName}</span>
          <span className="text-xs font-thin">{`${date.getHours()}:${date.getMinutes()}`}</span>
        </div>
        <p className="text-sm font-light py-2.5 break-all">{message}</p>
      </div>
    </li>
  );
};

export default Bubble;

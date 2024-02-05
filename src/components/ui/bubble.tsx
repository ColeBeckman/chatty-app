import React from 'react';
import Image from 'next/image';

interface Props {
  message: string;
  name: string;
  timestamp: string;
}
const Bubble = (props: Props) => {
  const { message, name, timestamp } = props;

  return (
    <li className="flex break-words items-start gap-2.5">
      {/* <Image
        className="w-8 h-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      /> */}
      <div className="flex flex-col leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 max-w-full">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {timestamp}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words">
          {message}
        </p>
      </div>
    </li>
  );
};

export default Bubble;

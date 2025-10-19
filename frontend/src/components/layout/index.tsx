import React, { ReactNode } from 'react';

type Props = {
  sidebar: ReactNode;
  children: ReactNode;
};

const BaseLayout = ({ sidebar, children }: Props) => {
  return (
    <div className='flex w-full min-h-screen relative'>
      <div className='w-64 flex-shrink-0 p-4'>{sidebar}</div>
      <div className='relative w-full p-4'>{children}</div>
    </div>
  );
};

export default BaseLayout;

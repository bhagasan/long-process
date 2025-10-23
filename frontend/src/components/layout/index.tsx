import React, { ReactNode } from 'react';

type Props = {
  topbar: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

const BaseLayout = ({ sidebar, children, topbar }: Props) => {
  return (
    <div className='flex w-full min-h-screen relative'>
      <div className='w-64 flex-shrink-0 p-4'>{sidebar}</div>
      <div className='relative w-full'>
        {topbar}
        <div className='px-4 pt-6 relative'>{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;

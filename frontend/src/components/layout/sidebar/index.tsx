import React from 'react';
import NavItem from './NavItem';
import { Card, Text } from '@radix-ui/themes';

const Sidebar = () => {
  return (
    <aside className='w-64 max-w-full h-full'>
      <Card variant='surface' className='h-full'>
        <div className='py-4 border-b'>
          <Text as='div' size='4' weight='bold'>
            Cloud Service App
          </Text>
        </div>
        <nav className='flex-1 py-2 space-y-1'>
          <NavItem label='Dahsboard' href='/' />
          <NavItem label='Virtual Machine' href='/virtual-machine' />
          <NavItem label='Storage' href='/storage' />
        </nav>
      </Card>
    </aside>
  );
};

export default Sidebar;

'use client';
import React from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import CircularProgress from '@/components/shared/CircularProgress';
import { BellIcon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';

const Topbar = () => {
  const { progress } = useSocket();

  return (
    <div className='relative w-full'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        <Card variant='surface' className='w-52 py-[8px]' size='1'>
          <Flex align='center' justify='between' width='100%' gapX='1'>
            <Text weight='medium' className='truncate'>
              VirtualMachine-03
            </Text>
            <div className='w-6 flex-shrink-0'>
              <CircularProgress progress={progress > 100 ? 100 : progress} size={24} stroke={3} />
            </div>
          </Flex>
        </Card>
        <IconButton size='3' variant='outline' radius='full' color='gray'>
          <BellIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Topbar;

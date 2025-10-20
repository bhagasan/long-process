'use client';
import React from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import CircularProgress from '@/components/shared/CircularProgress';
import { BellIcon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';

const Topbar = () => {
  const { progress, status, setStatus } = useSocket();

  return (
    <div className='relative w-full'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        <div className='absolute top-1/2 -translate-y-1/2 right-4 pr-10 pl-6 overflow-hidden'>
          <Card
            variant='surface'
            className={`w-52 py-[8px] duration-700  ${
              status === 'idle'
                ? 'translate-x-[120%] ease-[cubic-bezier(1,-0.49,.65,.85)]'
                : 'cursor-pointer ease-[cubic-bezier(.18,.12,0,1.47)]'
            }`}
            size='1'
            onClick={() => setStatus('idle')}
          >
            <Flex align='center' justify='between' width='100%' gapX='1'>
              <Text weight='medium' className='truncate'>
                VirtualMachine-03
              </Text>
              <div className='w-6 flex-shrink-0'>
                <CircularProgress progress={progress > 100 ? 100 : progress} size={24} stroke={3} />
              </div>
            </Flex>
          </Card>
        </div>
        <IconButton size='3' variant='outline' radius='full' color='gray' className='relative bg-white'>
          <BellIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Topbar;

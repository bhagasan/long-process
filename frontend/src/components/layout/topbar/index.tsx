'use client';
import { useSocket } from '@/components/context/SocketProvider';
import CircularProgress from '@/components/shared/CircularProgress';
import { BellIcon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

const Topbar = () => {
  const { socket, setProgress, progress } = useSocket();
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    socket.on('process:start', () => setStatus('running'));
    socket.on('process:update', (data) => setProgress(data.progress));
    socket.on('process:done', () => setStatus('done'));

    return () => {
      socket.off('process:start');
      socket.off('process:update');
      socket.off('process:done');
    };
  }, [setProgress, socket]);

  return (
    <div className='relative w-full'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        <Card variant='surface' className='w-52 py-[8px]' size='1'>
          <Flex align='center' justify='between' width='100%' gapX='1'>
            <Text weight='medium' className='truncate'>
              VirtualMachine-01sdsd
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

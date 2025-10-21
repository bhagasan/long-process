'use client';
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import CircularProgress from '@/components/shared/CircularProgress';
import { BellIcon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';

const Topbar = () => {
  const [dataQueue, setDataQueue] = useState<any>({});
  const { socket, clientId } = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('process:start', (data) => {
        // const { progress, actionType, actionId, itemLabel } = data;
        // console.log('start', { actionId, actionType, progress, itemLabel });
        setDataQueue(data);
      });

      socket.on('process:update', (data) => {
        // const { progress, actionType, actionId, itemLabel } = data;
        // console.log('update', { actionId, actionType, progress, itemLabel });
        setDataQueue(data);
      });

      socket.on('process:done', (data) => {
        // const { actionType, actionId, message, itemLabel } = data;
        // console.log('done', { actionId, actionType, itemLabel, message });
        setDataQueue(data);
      });

      // check on going progress (if any)
      socket.emit('get:process', { clientId });
      socket.on('process:list', (data) => {
        setDataQueue(data);
        // console.log(data);
      });
    });

    return () => {
      socket.off('process:start');
      socket.off('process:update');
      socket.off('process:done');
      socket.off('process:list');
    };
  }, [socket, clientId]);

  return (
    <div className='relative w-full'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        <div className='absolute top-1/2 -translate-y-1/2 right-4 pr-10 pl-6 overflow-hidden'>
          <Card
            variant='surface'
            className={`w-52 py-[8px] duration-700  ${
              dataQueue.progress >= 0
                ? 'cursor-pointer ease-[cubic-bezier(.18,.12,0,1.47)]'
                : 'translate-x-[120%] ease-[cubic-bezier(1,-0.49,.65,.85)]'
            }`}
            size='1'
          >
            <Flex align='center' justify='between' width='100%' gapX='1'>
              <Text weight='medium' className='truncate'>
                {dataQueue.itemLabel}
              </Text>
              <div className='w-6 flex-shrink-0'>
                <CircularProgress
                  progress={dataQueue.progress >= 100 ? 100 : dataQueue.progress}
                  size={24}
                  stroke={3}
                />
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

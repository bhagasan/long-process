'use client';
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import CircularProgress from '@/components/shared/CircularProgress';
import { BellIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';

const Topbar = () => {
  const [dataQueue, setDataQueue] = useState<any>({});
  const { socket, clientId } = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('process:start', (data) => {
        setDataQueue((prev: any) => ({
          ...prev,
          [data.actionId]: {
            progress: data.progress,
            actionType: data.actionType,
            itemLabel: data.itemLabel,
          },
        }));
      });

      socket.on('process:update', (data) => {
        setDataQueue((prev: any) => ({
          ...prev,
          [data.actionId]: {
            progress: data.progress,
            actionType: data.actionType,
            itemLabel: data.itemLabel,
          },
        }));
      });

      socket.on('process:done', (data) => {
        setDataQueue((prev: any) => ({
          ...prev,
          [data.actionId]: {
            progress: data.progress,
            actionType: data.actionType,
            itemLabel: data.itemLabel,
            done: true,
          },
        }));
      });

      socket.emit('get:process', { clientId });
      socket.on('process:list', (data) => setDataQueue(data));
    });

    return () => {
      socket.off('process:start');
      socket.off('process:update');
      socket.off('process:done');
      socket.off('process:list');
    };
  }, [socket, clientId]);

  const renderIslands = () => {
    const elms: any[] = [];
    Object.entries(dataQueue).forEach(([clientId], idx: number) => {
      const upper = idx < Object.keys(dataQueue).length - 1;
      const { itemLabel, progress } = dataQueue[clientId];

      elms.push(
        <div
          key={idx + itemLabel}
          style={{
            marginTop: upper ? '6px' : '0px',
            scale: upper ? 0.85 : 1,
            opacity: upper ? 0.35 : 1,
          }}
          className='absolute top-1/2 -translate-y-1/2 right-4 pr-10 pl-6 overflow-hidden'
        >
          <Card
            variant='surface'
            className={`w-52 py-[8px] duration-700 group`}
            style={{ backgroundColor: upper ? '#afafaf' : '#ffffff' }}
            size='1'
          >
            <Flex align='center' justify='between' width='100%' gapX='1'>
              <Text weight='medium' className='truncate'>
                {itemLabel}
              </Text>
              <div className='w-6 flex-shrink-0 group-hover:scale-125 group-hover:opacity-0 duration-300 pointer-events-none'>
                {progress >= 100 ? (
                  <IconButton color='grass' size='1' radius='full'>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <CircularProgress progress={progress >= 100 ? 100 : progress} size={24} stroke={3} />
                )}
              </div>
              <Cross2Icon
                className='absolute w-6 top-1/2 -translate-y-1/2 right-3 z-10 group-hover:opacity-100 opacity-0 group-hover:pointer-events-auto pointer-events-none cursor-pointer duration-500'
                onClick={() => console.log('close')}
              />
            </Flex>
          </Card>
        </div>,
      );
    });
    return elms;
  };

  return (
    <div className='relative w-full'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        {renderIslands()}
        {/* <div className='absolute top-1/2 -translate-y-1/2 right-4 pr-10 pl-6 overflow-hidden'>
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
        </div> */}
        <IconButton size='3' variant='outline' radius='full' color='gray' className='relative bg-white'>
          <BellIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Topbar;

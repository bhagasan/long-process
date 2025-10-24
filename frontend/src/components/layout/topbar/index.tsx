'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import CircularProgress from '@/components/shared/CircularProgress';
import { PersonIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';

const Topbar = () => {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [dataQueue, setDataQueue] = useState<any>({});
  const { socket, clientId } = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
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

      socket.on('process:list', (data) => setDataQueue(data));
    });

    return () => {
      socket.off('process:update');
      socket.off('process:done');
      socket.off('process:list');
    };
  }, [socket, clientId]);

  const dataQueueLength = () => {
    return Object.keys(dataQueue).length;
  };

  const handleDismiss = (actionId: string) => {
    socket.emit('queue:dismiss', { clientId, actionId });
    if (!cardContainerRef.current) return;
    // cardContainerRef.current.style.height = `${dataQueueLength() * 46}px`;
    // let temp = itemRefs.current.length - 1;
    let temp = itemRefs.current.length - 1;
    for (let idx: number = 0; idx < itemRefs.current.length; idx++) {
      temp--;
      itemRefs.current[idx].style.setProperty('transform', `translate3d(-50%, ${temp * 44}px,0)`);
    }
  };

  const renderIslands = () => {
    const elms: any[] = [];
    Object.entries(dataQueue).forEach(([actionId], idx: number) => {
      const backwards = idx < Object.keys(dataQueue).length - 1;
      const { itemLabel, progress } = dataQueue[actionId];

      elms.push(
        <div
          key={idx + itemLabel}
          ref={(el) => {
            if (el) itemRefs.current[idx] = el;
          }}
          className={`absolute top-0 left-1/2 -translate-x-1/2 cursor-default ${
            backwards
              ? `scale-[0.85] mt-2 opacity-35 group-hover/root:mt-0 group-hover/root:opacity-100 group-hover/root:scale-100 duration-200`
              : ''
          }`}
        >
          <Card
            variant='surface'
            className={`w-52 py-[8px] duration-200 group/card ${
              backwards ? 'bg-[#afafaf] group-hover/root:bg-white' : ''
            }`}
            size='1'
          >
            <Flex align='center' justify='between' width='100%' gapX='1'>
              <Text weight='medium' className='truncate'>
                {itemLabel}
              </Text>
              <div
                className={`w-6 flex-shrink-0 group-hover/card:scale-125 ${
                  progress < 100 ? '' : 'group-hover/card:opacity-0'
                } duration-300 pointer-events-none`}
              >
                {progress >= 100 ? (
                  <IconButton color='grass' size='1' radius='full'>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <CircularProgress progress={progress >= 100 ? 100 : progress} size={24} stroke={3} />
                )}
              </div>
              {progress >= 100 && (
                <Cross2Icon
                  className='absolute w-6 top-1/2 -translate-y-1/2 right-3 z-10 group-hover/card:opacity-100 opacity-0 group-hover/card:pointer-events-auto pointer-events-none cursor-pointer duration-500'
                  onClick={() => handleDismiss(actionId)}
                />
              )}
            </Flex>
          </Card>
        </div>,
      );
    });
    return elms;
  };

  const handleMouseEnterCardContainer = () => {
    if (!cardContainerRef.current) return;
    cardContainerRef.current.style.height = `${dataQueueLength() * 46}px`;
    let temp = itemRefs.current.length;
    for (let idx: number = 0; idx < itemRefs.current.length; idx++) {
      temp--;
      itemRefs.current[idx].style.setProperty('transform', `translate3d(-50%, ${temp * 44}px,0)`);
    }
  };

  const handleMouseLeaveCardContainer = () => {
    if (!cardContainerRef.current) return;
    cardContainerRef.current.style.height = '0px';
    const temp = itemRefs.current.length - 1;
    for (let idx: number = 0; idx < itemRefs.current.length - 1; idx++) {
      const isLast = idx === temp;
      itemRefs.current[idx].style.setProperty('transform', `translate3d(-50%, 0px,0px) ${!isLast && 'scale(0.85)'}`);
    }
  };

  return (
    <div className='relative w-full z-10'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        <div
          ref={cardContainerRef}
          onMouseLeave={handleMouseLeaveCardContainer}
          onMouseEnter={handleMouseEnterCardContainer}
          className={`absolute top-0 w-52 right-12 h-0 group/root`}
        >
          {renderIslands()}
        </div>
        <IconButton size='3' variant='outline' radius='full' color='gray' className='relative bg-white'>
          <PersonIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Topbar;

import CircularProgress from '@/components/shared/CircularProgress';
import { BellIcon } from '@radix-ui/react-icons';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';
import React from 'react';

const Topbar = () => {
  return (
    <div className='relative w-full'>
      <div className='fixed right-4 top-4 flex justify-end items-center gap-4'>
        <Card variant='surface' className='w-64 py-[6px]' size='1'>
          <Flex align='center' justify='between' width='100%'>
            <Text weight='medium'>VirtualMachine-01</Text>
            <CircularProgress progress={10} size={32} stroke={3} />
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

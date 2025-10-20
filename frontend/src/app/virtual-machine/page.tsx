'use client';

import { Box, Flex, Progress, Text } from '@radix-ui/themes';
import ModalCreate from '@/views/virtualMachine/ModalCreate';
import TableVM from '@/views/virtualMachine/TableVM';
import { useEffect, useState } from 'react';
import { useSocket } from '@/components/context/SocketProvider';

export default function VirtualMachinePage() {
  return (
    <main>
      <Flex direction='column' gap='4'>
        <Flex gap='2' align='center'>
          <Text as='div' size='6' weight='bold'>
            Virtual Machine
          </Text>
          <ModalCreate />
        </Flex>
        <Box>
          {/* <button onClick={startProcess} disabled={status === 'running'}>
            {status === 'running' ? 'Processing...' : 'Start Process'}
          </button>
          <Progress value={progress} size='1' />
          <p>Status: {status}</p>
          <p>Progress: {progress}%</p> */}
          <TableVM />
        </Box>
      </Flex>
    </main>
  );
}

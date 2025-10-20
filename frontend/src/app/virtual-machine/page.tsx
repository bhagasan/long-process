'use client';

import { Box, Flex, Progress, Text } from '@radix-ui/themes';
import ModalCreate from '@/views/virtualMachine/ModalCreate';
import TableVM from '@/views/virtualMachine/TableVM';
import { useEffect, useState } from 'react';
import { useSocket } from '@/components/context/SocketProvider';

export default function VirtualMachinePage() {
  const socket = useSocket();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');

  const startProcess = async () => {
    setStatus('running');
    await fetch('http://localhost:4000/vm-create', { method: 'POST' });
  };

  useEffect(() => {
    socket.on('process:start', () => setStatus('running'));
    socket.on('process:update', (data) => setProgress(data.progress));
    socket.on('process:done', () => setStatus('done'));

    return () => {
      socket.off('process:start');
      socket.off('process:update');
      socket.off('process:done');
    };
  }, [socket]);

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
          <button onClick={startProcess} disabled={status === 'running'}>
            {status === 'running' ? 'Processing...' : 'Start Process'}
          </button>
          <Progress value={progress} size='1' />
          <p>Status: {status}</p>
          <p>Progress: {progress}%</p>
          <TableVM />
        </Box>
      </Flex>
    </main>
  );
}

'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import ModalCreate from '@/views/virtualMachine/ModalCreate';
import TableVM from '@/views/virtualMachine/TableVM';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000');

export default function VirtualMachinePage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');

  const startProcess = async () => {
    setStatus('running');
    await fetch('http://localhost:4000/start-process', { method: 'POST' });
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
  }, []);

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
          <div
            style={{
              marginTop: 20,
              width: '100%',
              height: 20,
              background: '#eee',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'green',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <p>Status: {status}</p>
          <p>Progress: {progress}%</p>
          <TableVM />
        </Box>
      </Flex>
    </main>
  );
}

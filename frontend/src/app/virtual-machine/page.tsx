'use client';

import { Box, Flex, Skeleton, Text } from '@radix-ui/themes';
import ModalCreate from '@/views/virtualMachine/ModalCreate';
import TableVM from '@/views/virtualMachine/TableVM';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { fetchVMs } from '@/store/actions/vmActions';
import { useSocket } from '@/components/context/SocketProvider';

type LoadTypes = {
  setData: Dispatch<SetStateAction<any[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function VirtualMachinePage() {
  const [data, setData] = useState<any[]>([]); // holds your mock VMs
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadVMs = async ({ setData, setError, setLoading }: LoadTypes) => {
    try {
      const json = await fetchVMs();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVMs({ setData, setError, setLoading });
  }, []);

  const { socket, clientId } = useSocket();
  useEffect(() => {
    const handleProcessDone = (data: any) => {
      console.log('dataDone', data);
      loadVMs({ setData, setError, setLoading });
    };

    socket.on('process:done', handleProcessDone);

    const handleConnect = () => {
      console.log('Reconnected, refreshing data...');
      socket.emit('get:process', { clientId });
    };

    socket.on('connect', handleConnect);

    return () => {
      socket.off('process:done', handleProcessDone);
      socket.off('connect', handleConnect);
    };
  }, [socket, clientId]);

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
          <Skeleton loading={loading}>
            <TableVM data={data} />
          </Skeleton>
        </Box>
      </Flex>
    </main>
  );
}

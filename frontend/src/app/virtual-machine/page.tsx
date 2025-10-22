'use client';

import { Box, Flex, Skeleton, Text } from '@radix-ui/themes';
import ModalCreate from '@/views/virtualMachine/ModalCreate';
import TableVM from '@/views/virtualMachine/TableVM';
import { useEffect, useState } from 'react';

export default function VirtualMachinePage() {
  const [data, setData] = useState<any[]>([]); // holds your mock VMs
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVMs() {
      try {
        const res = await fetch('http://localhost:4000/mock/vm');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json); // assign data here
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVMs();
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
          <Skeleton loading={loading}>
            <TableVM data={data} />
          </Skeleton>
        </Box>
      </Flex>
    </main>
  );
}

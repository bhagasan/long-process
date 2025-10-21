'use client';
import { useSocket } from '@/components/context/SocketProvider';
import { TrashIcon } from '@radix-ui/react-icons';
import { Badge, IconButton, Skeleton, Table } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

const TableVM = () => {
  const [dataQueue, setDataQueue] = useState<any>({});
  const { socket, clientId } = useSocket();
  useEffect(() => {
    socket.on('connect', () => {
      socket.on('process:start', (data) => {
        setDataQueue(data);
      });

      socket.on('process:update', (data) => {
        setDataQueue(data);
      });

      socket.on('process:done', (data) => {
        setDataQueue(data);
      });

      // check on going progress (if any)
      socket.emit('get:process', { clientId });
      socket.on('process:list', (data) => {
        setDataQueue(data);
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
    <Table.Root variant='surface' mt='4'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>NAME</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>STATUS</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>PACKAGE</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>IP ADDRESS</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {dataQueue.progress >= 0 && dataQueue.progress < 100 && (
          <Table.Row>
            <Table.RowHeaderCell>
              <Skeleton height='28px' width='160px' />
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton height='28px' width='80px' />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height='28px' width='120px' />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height='28px' width='160px' />
            </Table.Cell>
            <Table.Cell width='60px'>
              <Skeleton height='28px' width='32px' />
            </Table.Cell>
          </Table.Row>
        )}
        <Table.Row>
          <Table.RowHeaderCell>VirtualMachine-01</Table.RowHeaderCell>
          <Table.Cell>
            <Badge color='green'>Running</Badge>
          </Table.Cell>
          <Table.Cell>vps-medium-m1</Table.Cell>
          <Table.Cell>130.59.192.10</Table.Cell>
          <Table.Cell width='60px'>
            <IconButton variant='soft' color='red'>
              <TrashIcon />
            </IconButton>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>VirtualMachine-02</Table.RowHeaderCell>
          <Table.Cell>
            <Badge color='green'>Running</Badge>
          </Table.Cell>
          <Table.Cell>vps-small-m1</Table.Cell>
          <Table.Cell>130.59.192.10</Table.Cell>
          <Table.Cell width='60px'>
            <IconButton variant='soft' color='red'>
              <TrashIcon />
            </IconButton>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default TableVM;

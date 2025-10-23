'use client';
import { useSocket } from '@/components/context/SocketProvider';
import { StatusColorTypes, VMStatusTypes } from '@/utils/types';
import { TrashIcon } from '@radix-ui/react-icons';
import { Badge, IconButton, Skeleton, Table } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

const TableVM = ({ data }: { data: any[] }) => {
  const { socket, clientId } = useSocket();
  const [processLength, setProcessLength] = useState<number>(0);

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('process:list', (data) => {
        const running = Object.values(data).filter((d: any) => d.progress !== 100);
        setProcessLength(running.length);
      });
    });

    return () => {
      socket.off('process:list');
    };
  }, [socket, clientId]);

  const renderBadge = (status: VMStatusTypes) => {
    let color: StatusColorTypes = 'green';
    switch (status) {
      case 'Stopped':
        color = 'orange';
        break;
      case 'Crashed':
        color = 'red';
        break;
    }

    return <Badge color={color}>{status}</Badge>;
  };

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
        {Array.from({ length: processLength }, (_, idx) => (
          <Table.Row key={`skeleton-${idx}`}>
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
        ))}

        {data.map((d: any) => (
          <Table.Row key={d.id}>
            <Table.RowHeaderCell>{d.name}</Table.RowHeaderCell>
            <Table.Cell>{renderBadge(d.status)}</Table.Cell>
            <Table.Cell>vps-medium-m1</Table.Cell>
            <Table.Cell>{d.ip}</Table.Cell>
            <Table.Cell width='60px'>
              <IconButton variant='soft' color='red'>
                <TrashIcon />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableVM;

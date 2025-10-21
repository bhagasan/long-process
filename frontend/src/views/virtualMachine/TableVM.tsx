'use client';
import { TrashIcon } from '@radix-ui/react-icons';
import { Badge, IconButton, Skeleton, Table } from '@radix-ui/themes';
import React from 'react';

const TableVM = () => {
  // const { progress, status } = useSocket();
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
        {/* {status === 'running' && (
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
        )} */}
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

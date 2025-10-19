import { Badge, Box, Button, Flex, Table, Text } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import ModalCreate from '@/views/virtualMachine/ModalCreate';

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
          <Table.Root variant='surface'>
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
              <Table.Row>
                <Table.RowHeaderCell>VirtualMachine-01</Table.RowHeaderCell>
                <Table.Cell>
                  <Badge color='green'>Running</Badge>
                </Table.Cell>
                <Table.Cell>vps-medium-m1</Table.Cell>
                <Table.Cell>130.59.192.10 (Private)</Table.Cell>
                <Table.Cell width='60px'>
                  <Button variant='soft' color='red'>
                    <TrashIcon />
                  </Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.RowHeaderCell>VirtualMachine-02</Table.RowHeaderCell>
                <Table.Cell>
                  <Badge color='green'>Running</Badge>
                </Table.Cell>
                <Table.Cell>vps-small-m1</Table.Cell>
                <Table.Cell>130.59.192.10 (Private)</Table.Cell>
                <Table.Cell width='60px'>
                  <Button variant='soft' color='red'>
                    <TrashIcon />
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </main>
  );
}

import { PlusIcon } from '@radix-ui/react-icons';
import { AlertDialog, Box, Button, Flex, Select, Text, TextField } from '@radix-ui/themes';
import React from 'react';

const ModalCreate = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant='outline' size='1'>
          Create
          <PlusIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth='600px'>
        <AlertDialog.Title>Create Virtual Machine</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          This process may take a few minutes. During this time, all actions related to the virtual machine are
          temporarily restricted.
        </AlertDialog.Description>

        <Box my='4'>
          <Flex direction='column' gap='3'>
            <Flex gap='3'>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Location
                </Text>
                <Select.Root>
                  <Select.Trigger placeholder='Select location' className='w-full' />
                  <Select.Content>
                    <Select.Item value='indonesia'>Indonesia</Select.Item>
                    <Select.Item value='singapore' disabled>
                      Singapore
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Data Center
                </Text>
                <Select.Root>
                  <Select.Trigger placeholder='Select Data center' className='w-full' />
                  <Select.Content>
                    <Select.Item value='jkt-dc-1'>jkt-dc-1</Select.Item>
                    <Select.Item value='jkt-dc-2'>jkt-dc-2</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>
            </Flex>
            <Flex gap='3'>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Hostname
                </Text>
                <TextField.Root placeholder='Enter hostname' />
              </Box>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Password
                </Text>
                <TextField.Root type='password' placeholder='Enter root password' />
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Flex gap='3' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button>Submit</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ModalCreate;

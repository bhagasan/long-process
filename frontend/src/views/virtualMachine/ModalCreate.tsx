'use client';
import { useSocket } from '@/components/context/SocketProvider';
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog, Box, Button, Flex, Select, Text, TextField } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type PayloadTypes = {
  location: string;
  dc: string;
  hostname: string;
  password: string;
  package: string;
  ip: string;
};

const ModalCreate = () => {
  const { socket } = useSocket();
  const clientId = typeof window !== 'undefined' ? localStorage.getItem('clientId') : null;
  const [open, setOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PayloadTypes>({
    defaultValues: {
      location: '',
      dc: '',
      hostname: '',
      password: '',
      package: '',
      ip: '',
    },
    mode: 'onChange',
  });

  const startProcess = async (data: PayloadTypes) => {
    // setStatus('running');
    await fetch('http://localhost:4000/vm-create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, clientId }),
    });
    socket.emit('startProcess', clientId);
  };

  useEffect(() => {
    if (open) {
      reset({
        password: '',
        dc: '',
        hostname: '',
        location: '',
      });
    }
  }, [open, reset]);

  const onSubmit = (data: PayloadTypes) => {
    startProcess(data);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant='outline' size='1'>
          Create
          <PlusIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <Dialog.Title>Create Virtual Machine</Dialog.Title>
        <Dialog.Description size='2'>
          This process may take a few minutes. During this time, all actions related to the virtual machine are
          temporarily restricted.
        </Dialog.Description>

        <Box my='4'>
          <Flex direction='column' gap='3'>
            <Flex gap='3'>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Location
                </Text>
                <Controller
                  control={control}
                  name='location'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select.Root onValueChange={field.onChange} value={field.value}>
                      <Select.Trigger placeholder='Select location' className='w-full' />
                      <Select.Content>
                        <Select.Item value='indonesia'>Indonesia</Select.Item>
                        <Select.Item value='singapore' disabled>
                          Singapore
                        </Select.Item>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Box>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Data Center
                </Text>
                <Controller
                  control={control}
                  name='dc'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select.Root onValueChange={field.onChange} value={field.value}>
                      <Select.Trigger placeholder='Select Data center' className='w-full' />
                      <Select.Content>
                        <Select.Item value='jkt-dc-1'>jkt-dc-1</Select.Item>
                        <Select.Item value='jkt-dc-2'>jkt-dc-2</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Box>
            </Flex>
            <Flex gap='3'>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Package
                </Text>
                <Controller
                  control={control}
                  name='package'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select.Root onValueChange={field.onChange} value={field.value}>
                      <Select.Trigger placeholder='Select package' className='w-full' />
                      <Select.Content>
                        <Select.Item value='vps-medium-m1'>vps-medium-m1</Select.Item>
                        <Select.Item value='vps-small-m1'>vps-small-m1</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Box>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  IP Address
                </Text>
                <Controller
                  control={control}
                  name='ip'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select.Root onValueChange={field.onChange} value={field.value}>
                      <Select.Trigger placeholder='Select IP Address' className='w-full' />
                      <Select.Content>
                        <Select.Item value='192.168.10.2'>192.168.10.2</Select.Item>
                        <Select.Item value='192.168.10.3'>192.168.10.3</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </Box>
            </Flex>
            <Flex gap='3'>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Hostname
                </Text>
                <Controller
                  control={control}
                  name='hostname'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField.Root onChange={field.onChange} value={field.value} placeholder='Enter hostname' />
                  )}
                />
              </Box>
              <Box width='100%'>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Password
                </Text>
                <Controller
                  control={control}
                  name='password'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField.Root
                      onChange={field.onChange}
                      value={field.value}
                      type='password'
                      placeholder='Enter root password'
                    />
                  )}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Flex gap='3' justify='end'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            Submit
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ModalCreate;

import { Flex, Text } from '@radix-ui/themes';
import React from 'react';

const StoragePage = () => {
  return (
    <main>
      <Flex direction='column' gap='2'>
        <Flex gap='2'>
          <Text as='div' size='6' weight='bold'>
            Storage
          </Text>
        </Flex>
      </Flex>
    </main>
  );
};

export default StoragePage;

import { Flex, Text } from '@radix-ui/themes';

export default function Home() {
  return (
    <main>
      <Flex direction='column' gap='2'>
        <Flex gap='2'>
          <Text as='div' size='6' weight='bold'>
            Dashboard
          </Text>
        </Flex>
      </Flex>
    </main>
  );
}

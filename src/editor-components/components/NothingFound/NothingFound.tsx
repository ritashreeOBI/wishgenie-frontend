import { Flex, Heading } from '@chakra-ui/react';

type Props = {
  message: string;
};

const NothingFound = ({ message }: Props) => {
  return (
    <Flex minH="400px" alignItems="center" justifyContent="center" flexDirection="column" color="gray.500">
      {/* <Icon as={icon} boxSize="30px" mb="10px" /> */}
      <Heading as="h5" fontWeight='normal' fontSize="12px" mb="5px" textAlign={'center'}>
        {message}
      </Heading>
    </Flex>
  );
};
export default NothingFound;

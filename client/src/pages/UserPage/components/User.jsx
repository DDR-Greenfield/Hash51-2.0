import React, { useContext } from 'react';

import {
  chakra,
  Box,
  Image,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';

import { UserContext } from '../../../contexts/UserContext';
import Chat from './Chat/Chat';

const User = () => {
  const { userObj } = useContext(UserContext);
  const { username, profileImage } = userObj;

  const textColor = useColorModeValue('green.700', 'green.500');
  const greyColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <chakra.div
      position="fixed"
    >
      <Chat />
      <Box
        mb="1px"
        w="100%"
        borderRadius={10}
      >
        <Image
          w="200px"
          mt={6}
          mb={6}
          borderRadius="100%"
          objectFit="cover"
          src={profileImage}
        />

        <Center
          size="2xl"
          color="white"
        >
          <b>
            {username}
          </b>
        </Center>

      </Box>
    </chakra.div>
  );
};

export default User;

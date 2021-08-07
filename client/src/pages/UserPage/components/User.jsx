import React, { useContext } from 'react';

import {
  Text,
  Box,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

import { UserContext } from '../../../contexts/UserContext';

const User = () => {
  const { userObj } = useContext(UserContext);
  const { username, profileImage } = userObj;

  const textColor = useColorModeValue('green.700', 'green.500');
  const greyColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box
      bg={greyColor}
      mb="1px"
      w="10vw"
      borderRadius={10}
    >
      <Image
        bg="purple.100"
        w="10vw"
        h="10vw"
        borderTopRadius={10}
        objectFit="cover"
        src={profileImage}
      />
      <Text
        ml="10px"
        fontSize="12px"
        color={textColor}
      >
        {username}
      </Text>
    </Box>
  );
};

export default User;

import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Box,
  Image,
  Flex,
  chakra,
  Center,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

import DeleteFriendPopover from './DeleteFriendPopover.jsx';
import { UserContext } from '../../../contexts/UserContext';

const Conspirator = (props) => {
  const { conspirator } = props;
  const { username, profileImage, _id } = conspirator;
  const { updateConspirator, usersInChat, userObj } = useContext(UserContext);

  const textColor = useColorModeValue('green.700', 'green.200');
  const greyColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box
      w="100%"
      mb="1px"
      bg={greyColor}
      borderRadius={10}
    >
      <Center>
        {usersInChat.includes(username) && <Badge>In Chat</Badge>}
        <Image
          src={profileImage}
          bg="purple.100"
          w="100px"
          h="100px"
          objectFit="cover"
          borderTopRadius={10}
        />
        <chakra.div mr={3}>
          <Text
            mt="4px"
            ml="10px"
            fontSize="10px"
            color={textColor}
          >
            {username}
          </Text>
          <DeleteFriendPopover
            updateConspirator={updateConspirator}
            _id={_id}
            userName={username}
            userObj={userObj}
          />
        </chakra.div>
      </Center>
    </Box>
  );
};

// Conspirator.propTypes = {
//   conspirator: PropTypes.isRequired,
// };

export default Conspirator;

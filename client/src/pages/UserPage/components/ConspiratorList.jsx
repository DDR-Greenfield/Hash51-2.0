import React, { useContext, useState, useEffect } from 'react';

import {
  VStack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';

import Conspirator from './Conspirator';
import { UserContext } from '../../../contexts/UserContext';

const ConspiratorList = () => {
  const { conspirators, usersInChat } = useContext(UserContext);
  useEffect(() => {
  }, [conspirators]);

  const textColor = useColorModeValue('green.300', 'green.500');

  return (
    <VStack
      h="63vh"
      // w="150px"
      divider={<StackDivider borderColor={textColor} />}
      spacing={2}
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <StackDivider borderColor={textColor} />
      {/* eslint-disable-next-line no-underscore-dangle */}
      {conspirators.map((conspirator) => (<Conspirator isInChat={usersInChat} key={conspirator._id} conspirator={conspirator} />))}
    </VStack>

  );
};

export default ConspiratorList;

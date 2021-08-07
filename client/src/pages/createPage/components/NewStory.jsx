import React, { useContext } from 'react';

import {
  Text,
  Box,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

import { EvidenceContext } from '../../../contexts/EvidenceContext';
import { UserContext } from '../../../contexts/UserContext';

import PostStory from './PostStory';

const NewStory = () => {
  const { href } = useContext(EvidenceContext);
  const { userObj } = useContext(UserContext);

  const textColor = useColorModeValue('green.300', 'green.500');
  const boxColor = useColorModeValue('gray.700', 'gray.800');
  return (
    <div>
      <Box
        bg={boxColor}
        mb=".5vh"
        w="60vw"
        borderTopRadius={10}
      >
        <Text
          ml="10px"
          mb="10px"
          fontSize="25px"
          color={textColor}
        >
          Tell your story
          {' '}
          {userObj.username}
        </Text>
        {href.slice(0, 8) !== 'http://y' ?
          (
            <Image
              src={href}
              objectFit="contain"
              w="60vw"
              h="60vh"
              bg={boxColor}
            />
          ) :
          (
            <iframe
              title="youtubeVideo"
              src={href}
              height="360"
              width="640"
            />
          )}
        { userObj.username ? (
          <PostStory />
        ) : (
          <div />
        )}

      </Box>
    </div>
  );
};

export default NewStory;

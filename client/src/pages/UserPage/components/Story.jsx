import React, { useContext } from 'react';

import {
  Text,
  Box,
  Image,
  Flex,
  Heading,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';

import CommentList from './CommentList';
import { UserContext } from '../../../contexts/UserContext';
import AddFriendPopover from './AddFriendPopover';
import EditTitleModal from './EditTitleModal';
import { DisplayContext } from '../../../contexts/DisplayContext';

const Story = (props) => {
  const { story } = props;
  const { userName, nasaTitle, userTitle, href, bodyText, comments, _id } = story;

  const { addConspirator, userObj, isLoggedIn } = useContext(UserContext);

  const { deleteStory } = useContext(DisplayContext);

  const textColor = useColorModeValue('green.700', 'green.100');
  const whiteColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const greyColor = useColorModeValue('gray.300', 'gray.600');
  const redColor = useColorModeValue('red.600', 'red.300');

  return (
    <div>
      {isLoggedIn && userObj.username === userName && (
      <Button
              // variant="ghost"
        onClick={() => { deleteStory(_id); }}
        float="right"
        variant="ghost"
      >
        Burn The Evidence!
      </Button>
      )}
      {isLoggedIn && userObj.username === userName && (
      <EditTitleModal
        float="right"
        _id={_id}
        userTitle={userTitle}
        bodyText={bodyText}
      />
      )}
      <Box
        h="59vh"
        w="60vw"
        bg={greyColor}
        mb=".5vh"
        borderTopRadius={10}
      >
        <Flex>
          {href.slice(0, 8) !== 'http://y' ?
            (
              <Image
                src={href}
                h="59vh"
                w="45vw"
                bg="purple.100"
                fit="cover"
                borderTopLeftRadius={10}
              />
            ) :
            (
              <iframe
                title="youtubeVideo"
                src={href}
                height="540vh"
                width="854px"
              />
            )}
          <Box
            w="17vw"
          >

            <Heading
              mt="2vh"
              p={2}
              // maxH="12vh"
              fontSize="42px"
              as="i"
              // overflowY="scroll"
              color={whiteColor}
            >
              {userTitle}
            </Heading>
            <hr />
            <Text
              ml={2}
              as="i"
              fontSize="14px"
            >
              Online Description:
            </Text>
            <hr />
            <Text
              ml="10px"
              mb="1vh"
              color={redColor}
              pt={2}
            >
              {href.slice(0, 8) !== 'http://y' ?
                ('NASA image title: ') :
                ('Video title of the truth: ')}
              {' '}
              {nasaTitle}
            </Text>
            <hr />
            <Text
              as="i"
              ml={2}
              fontSize="14px"
            >
              User Description:
              <hr />
            </Text>
            <Text
              fontSize="20px"
              ml="10px"
              mt={3}
              color={textColor}
              overflowY="scroll"
              maxH="30vh"
            >
              {bodyText}
            </Text>

            <Text
              ml="10px"
              fontSize="16px"
              mt={1}
              as="u"
              color={whiteColor}
            >

              Created by
              {' '}
              {userName}
            </Text>

            {isLoggedIn && userObj.username !== userName && (
              <AddFriendPopover
                addConspirator={addConspirator}
                userName={userName}
                userObj={userObj}
              />
            )}
          </Box>
        </Flex>
      </Box>
      <CommentList comments={comments} post_id={_id} />
    </div>
  );
};

export default Story;

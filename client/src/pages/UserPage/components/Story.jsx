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
  const redColor = useColorModeValue('red.800', 'red.100');

  return (
    <div>
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
                h="55vh"
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
                height="480px"
                width="854px"
              />
            )}
          <Box
            w="17vw"
          >
            <EditTitleModal
              float="right"
              _id={_id}
              userTitle={userTitle}
              bodyText={bodyText}
            />
            <Button
              // variant="ghost"
              onClick={() => { deleteStory(_id); }}
              float="right"
              variant="ghost"
            >
              Burn The Evidence!
            </Button>
            <Heading
              mt="2vh"
              p={2}
              // maxH="12vh"
              fontSize="32px"
              // overflowY="scroll"
              color={whiteColor}
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
              {userTitle}
            </Heading>

            <Text
              fontSize="20px"
              p={3}
              h="38vh"
              mt={3}
              color={textColor}
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
              {bodyText}
              <Text
                ml="10px"
                fontSize="16px"
                mt={1}
                as="u"
                color={whiteColor}
                // eslint-disable-next-line consistent-return
                onClick={() => {
                  if (userObj.username) {
                    return addConspirator(userName);
                  }
                }}
              >

                Created by
                {' '}
                {userName}
              </Text>
            </Text>
            {isLoggedIn && (
            <AddFriendPopover
              addConspirator={addConspirator}
              userName={userName}
              userObj={userObj}
            />
            )}
          </Box>
        </Flex>
        <Text
          ml="10px"
          fontSize="10px"
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

      </Box>
      <CommentList comments={comments} post_id={_id} />
    </div>
  );
};

export default Story;

/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Box,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';

import Comment from './Comment';
import PostComment from './PostComment';
import { UserContext } from '../../../contexts/UserContext';

const CommentList = (props) => {
  // eslint-disable-next-line camelcase
  const { comments, post_id } = props;
  const { userObj } = useContext(UserContext);

  const textColor = useColorModeValue('green.700', 'green.500');
  const greyColor = useColorModeValue('gray.300', 'gray.600');
  const whiteColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');

  return (
    <Box
      bg={greyColor}
      mt={4}
      mb="7vh"
      w="60vw"
      borderRadius={10}
      color={whiteColor}
    >
      <Text
        as="i"
        pt=".25vw"
        ml="2vw"
        mb="1vh"
        fontSize="20px"
        color={whiteColor}
      >
        Comments
      </Text>

      {comments.map((comment) => <Comment key={comment.commentBody} comment={comment} color={textColor} />)}

      {userObj.username ? (
        <PostComment post_id={post_id} />
      ) : (
        <Center>
          <Text
            ml="2vw"
            pb="1vh"
            fontSize="32px"
            color={textColor}
          >
            login to comment.
          </Text>
        </Center>
      )}

    </Box>
  );
};

// CommentList.propTypes = {
//   comments: PropTypes.isRequired,
//   post_id: PropTypes.isRequired
// };

export default CommentList;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Flex,
  Textarea,
} from '@chakra-ui/react';

import { DisplayContext } from '../../../contexts/DisplayContext';
import { UserContext } from '../../../contexts/UserContext';

const PostComment = (props) => {
  // eslint-disable-next-line camelcase
  const { post_id } = props;
  const { fetchStories, handleCommentBody, postComment, commentBody } = useContext(DisplayContext);
  const { userObj } = useContext(UserContext);

  return (
    <Flex>
      <Box
        w="52vw"
        mb="1.25vh"
        ml="2vw"
        bg="gray.200"
        borderLeftRadius={10}
      >
        <Textarea
          placeholder="Tinfoil hat not included..."
          fontSize="14px"
          color="black"
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
          onChange={handleCommentBody}
          value={commentBody}
        />
      </Box>
      <Button
        h="80px"
        w="4vw"
        colorScheme="green"
        borderLeftRadius={0}
        onClick={() => {
          postComment(post_id, userObj);
          fetchStories();
        }}
      >
        Post
      </Button>
    </Flex>
  );
};

PostComment.propTypes = {
  post_id: PropTypes.isRequired,
};
export default PostComment;

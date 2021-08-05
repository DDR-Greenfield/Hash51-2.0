/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Box,
  useColorModeValue
} from "@chakra-ui/react";

import Comment from './Comment';
import PostComment from './PostComment';
import { UserContext } from '../../../contexts/UserContext';

const CommentList = (props) => {
  // eslint-disable-next-line camelcase
  const { comments, post_id } = props;
  const { userObj } = useContext(UserContext);

  const textColor = useColorModeValue("green.500", "green.300");
  const greyColor = useColorModeValue("gray.600" , "gray.300");
  const whiteColor = useColorModeValue("whiteAlpha.900" , "blackAlpha.900");

  return (
    <Box
      bg={greyColor}
      mb="7vh"
      w="60vw"
      borderBottomRadius={10}
    >
      <Text
        pt=".25vw"
        ml="2vw"
        mb="1vh"
        fontSize="10px"
        color={whiteColor}
      >
        Comments
      </Text>

      {comments.map((comment) => <Comment key={comment.commentBody} comment={comment} />)}

      {userObj.username ? (
        <PostComment post_id={post_id} color={whiteColor}/>
      ) : (
        <Text
          ml="2vw"
          pb="1vh"
          fontSize="10px"
          color={textColor}
        >
          login to comment.
        </Text>
      )}

    </Box>
  );
};

// CommentList.propTypes = {
//   comments: PropTypes.isRequired,
//   post_id: PropTypes.isRequired
// };

export default CommentList;

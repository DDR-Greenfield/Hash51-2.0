/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Flex,
  Box,
} from '@chakra-ui/react';

import { DisplayContext } from '../../contexts/DisplayContext';
import { UserContext } from '../../contexts/UserContext';
import ConspiratorList from './components/ConspiratorList';
import User from './components/User';
import Story from './components/Story';
import Chat from './components/Chat/Chat';

const UserContainer = (props) => {
  const { user } = props;
  const { conspirators } = user;

  const { stories, fetchStories, setStories } = useContext(DisplayContext);
  const { userObj, getEvidence, getConspirators, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
    fetchStories().then((data) => {
      setStories(data);
    });
    getEvidence();
    getConspirators();
  },
  [JSON.stringify(userObj), stories]);

  return (
    <div>
      <Flex color="white">

        {userObj.username ?
          (
            <Box>
              <div>
                <Chat user={user} />
                <User user={user} />
                <ConspiratorList conspirators={conspirators} />
              </div>
            </Box>
          ) : (
            <div />
          )}

        <Box
          maxH="89vh"
          minW="50vw"
          verticalAlign="top"
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

          {stories.map((story) => (<Story key={story._id} story={story} />))}

        </Box>
      </Flex>
    </div>
  );
};

UserContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UserContainer;

/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Flex, Box, Select } from '@chakra-ui/react';

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

  const [sorted, setSorted] = React.useState('Default');
  const [list, setList] = React.useState('');

  const sort = (storyToSort) => {
    let returnArr = [];
    if (sorted === 'comments') {
      returnArr = storyToSort.sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
    } else if (sorted === 'alphabetical') {
      returnArr = storyToSort.sort((a, b) => {
        return a.userTitle.localeCompare(b.userTitle);
      });
    } else if (sorted === 'reverseAlphabetical') {
      returnArr = storyToSort.sort((a, b) => {
        return b.userTitle.localeCompare(a.userTitle);
      });
    } else {
      returnArr = storyToSort;
    }
    fetchStories().then((data) => {
      setStories(data);
    });
    return returnArr.map((story) => <Story key={story._id} story={story} />);
  };

  useEffect(() => {
    getUser();
    sort(stories);
    getEvidence();
    getConspirators();
  }, [JSON.stringify(userObj), sorted]);

  return (
    <div>
      <Flex mt={12}>
        {userObj.username ? (
          <Box mr="250px">
            <div>
              <User user={user} />
              <ConspiratorList conspirators={conspirators} />
            </div>
          </Box>
        ) : (
          <div />
        )}

        <Box verticalAlign="top">
          <Select
            placeholder="Sort by:"
            variant="filled"
            value={sorted}
            onChange={(e) => {
              setSorted(e.target.value);
            }}
          >
            <option value="comments">Comments</option>
            <option value="alphabetical">Title A-Z </option>
            <option value="reverseAlphabetical">Title Z-A</option>
          </Select>

          {sort(stories)}
        </Box>
      </Flex>
    </div>
  );
};

UserContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UserContainer;

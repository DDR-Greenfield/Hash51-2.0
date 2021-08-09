/* eslint-disable func-style */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const DisplayContext = createContext();

function DisplayContextProvider({ children }) {
  const [stories, setStories] = useState([]);
  const [commentBody, setCommentBody] = useState('');

  const handleCommentBody = (event) => setCommentBody(event.target.value);

  const fetchStories = () => axios.get('/routes/story').then((result) => result.data);

  // eslint-disable-next-line camelcase
  const postComment = async (post_id, userObj) => {
    const { username, profileImage } = userObj;
    const comment = { commentBody, post_id, userName: username, profileImage };
    await axios
      .post('/routes/story/comment', comment)
      .then(() => setCommentBody(''))
      .then(() => fetchStories().then((data) => {
        setStories(data);
      }));
  };

  const editStory = (_id, newTitle, newDescription) => axios.patch('/routes/storyUpdate', { _id, newTitle, newDescription }).then((data) => data);

  const deleteStory = async (postId) => {
    await axios.delete(`/routes/storyDelete/${postId}`)
      .then((data) => data);
  };

  const displayProps = {
    stories,
    setStories,
    fetchStories,
    editStory,
    postComment,
    handleCommentBody,
    setCommentBody,
    commentBody,
    deleteStory,
  };

  return (
    <DisplayContext.Provider value={displayProps}>
      {children}
    </DisplayContext.Provider>
  );
}

DisplayContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { DisplayContext, DisplayContextProvider };

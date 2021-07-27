/* eslint-disable func-style */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


const EvidenceContext = createContext();

function EvidenceContextProvider({ children }){

  const haveEvidence = 'Yes We Do';
  const [ searchResults, setSearchResults ] = useState([]);
  const [ searchImage, setSearchImage ] = useState({});
  const [ bodyText, setBodyText ] = useState('');

  const handlePostBody = (event) => setBodyText(event.target.value);

  const fetchSearch = async(query) => {
    await axios.post('/routes/search', { query })
    .then(results => {
      // console.log(results);
      setSearchResults(results.data);
    });
  };

  const fetchImage = async(query) => {
    await axios.post('/routes/asset', { query })
    .then(results => {
      setSearchImage(results.data.items[0].href);
    });
  };

  const postStory = async(story) => {
    await axios.post('/routes/story', { story })
    .then(results => {
      setSearchImage(results.data.items[0].href);
    });
  };

  const evidenceProps = {
    haveEvidence,
    searchResults,
    fetchSearch,
    searchImage,
    fetchImage,
    postStory,
    bodyText, 
    setBodyText,
    handlePostBody
  };

  return (
    <EvidenceContext.Provider value={evidenceProps}>
      {children}
    </EvidenceContext.Provider>
  );
}

EvidenceContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};


export { EvidenceContext, EvidenceContextProvider };

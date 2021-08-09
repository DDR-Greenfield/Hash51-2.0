import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  Image,
  SimpleGrid,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import { EvidenceContext } from '../../../contexts/EvidenceContext';

const SearchResult = () => {
  const {
    searchResults,
    fetchImage,
    // eslint-disable-next-line camelcase
    setNasa_id,
    setNasaTitle,
    setKeywords,
    setVideoDescription,
    // setVideoId,
    setVideoThumbnail,
    // setVideoTitle,
    setVideoUrl,
  } = useContext(EvidenceContext);

  const textColor = useColorModeValue('green.300', 'green.500');

  const handleCLick = (result) => {
    const {
      // eslint-disable-next-line camelcase
      nasa_id,
      title,
      keywords,
      videoDescription,
      videoId,
      videoThumbnail,
      videoTitle,
      videoUrl,
    } = result;
    // eslint-disable-next-line camelcase
    if (nasa_id) {
      setNasa_id(nasa_id);
      setNasaTitle(title);
      setKeywords(keywords);
      fetchImage(nasa_id);
    } else {
      setVideoDescription(videoDescription);
      setNasa_id(videoId);
      setVideoThumbnail(videoThumbnail);
      setNasaTitle(videoTitle);
      setVideoUrl(videoUrl);
      fetchImage(videoUrl);
    }
  };

  return searchResults.length ?
    (
      <Flex
        pt="20px"
      >
        <SimpleGrid columns={4} spacing={10}>
          {
            searchResults.map((result, i) => (
            // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                <Link to={`story/${result.nasa_id}`}>
                  <Image
                    m={1}
                    borderRadius="50px"
                    boxSize="300px"
                    objectFit="cover"
                    src={result.thumb ? result.thumb : result.videoThumbnail}
                    onClick={() => handleCLick(result)}
                    boxShadow="2xl"
                  />
                </Link>
              </div>
            ))
          }
        </SimpleGrid>
      </Flex>
    ) : <Heading color={textColor} size="md" m={2}>Search for the truth...</Heading>;
};

export default SearchResult;

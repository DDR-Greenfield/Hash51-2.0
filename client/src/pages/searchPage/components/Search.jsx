import React, { useContext, useState } from 'react';

import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Flex,
} from '@chakra-ui/react';

import { EvidenceContext } from '../../../contexts/EvidenceContext';

const Search = () => {
  const { fetchSearch } = useContext(EvidenceContext);
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);

  return (
    <Flex
      w="25vw"
      borderRadius={5}
    >
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          value={value}
          onChange={handleChange}
          color="white"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => fetchSearch(value)}
            colorScheme="green"
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default Search;

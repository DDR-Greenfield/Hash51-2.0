/* eslint-disable no-console */

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';

import { UserContext } from '../../../contexts/UserContext';

import GoogleButton from './GoogleButton';

const Login = (props) => {
  const { createUserClick } = props;
  const [showPassword] = useState(false);

  const {
    userLogin,
    passLogin,
    handleUserLogin,
    handlePassLogin,
    localLogin,
  } = useContext(UserContext);

  const textColor = useColorModeValue('green.300', 'green.500');
  const whiteColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const greyColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Flex
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color={textColor}>We want to believe...</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              boxShadow="md"
              borderRadius={10}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    value={userLogin}
                    onChange={handleUserLogin}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color={greyColor}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={passLogin}
                    onChange={handlePassLogin}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Link to="/">
                <Button
                  borderRadius={10}
                  type="submit"
                  variant="solid"
                  colorScheme="purple"
                  onClick={() => localLogin(userLogin, passLogin)}
                >
                  Login
                </Button>
              </Link>

              <GoogleButton />

              <Box color="white">
                Do we know you?
                {' '}
              </Box>
              <Button
                borderRadius={10}

                onClick={createUserClick}
                variant="solid"
                colorScheme="purple"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

Login.propTypes = {
  createUserClick: PropTypes.func.isRequired,
};

export default Login;

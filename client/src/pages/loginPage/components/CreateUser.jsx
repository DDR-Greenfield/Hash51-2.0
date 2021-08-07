/* eslint-disable no-console */

import React, { useContext } from 'react';
import {
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

const CreateUser = () => {
  const {
    showPassword,
    userReg,
    handleUserReg,
    pass,
    handlePass,
    confirm,
    handleConfirm,
    localRegister,
  } = useContext(UserContext);

  const textColor = useColorModeValue('green.300', 'green.500');
  const whiteColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const greyColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    >
      <Heading color={textColor}>We want you to believe, too...</Heading>
      <Box minW={{ base: '90%', md: '468px' }}>
        <form>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor={whiteColor}
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
                  value={userReg}
                  onChange={handleUserReg}
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
                  value={pass}
                  onChange={handlePass}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm">
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color={greyColor}
                />
                <Input
                  value={confirm}
                  onChange={handleConfirm}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm">
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={10}
              type="submit"
              variant="solid"
              colorScheme="purple"
              onClick={() => localRegister(userReg, pass, confirm)}
            >
              Create user
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default CreateUser;

import React, { useContext } from 'react';

import {
Button,
Link,
useColorModeValue
} from "@chakra-ui/react";

import { UserContext } from '../../../contexts/UserContext';

const GoogleButton = () => {
  const { getUser } = useContext(UserContext);
  const whiteColor = useColorModeValue("whiteAlpha.900" , "blackAlpha.900");
  return (
    <Link href='auth/google'>
      <Button
        type='button'
        onClick={ getUser }
        borderRadius={10}
        color="white"
        variant="solid"
        colorScheme="purple"
        color={whiteColor}
      >
        Sign In With Google
      </Button>
    </Link>
    );
};

export default GoogleButton;

import React, { useContext } from 'react';

import {
  Button,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

import { UserContext } from '../../../contexts/UserContext';

const GoogleButton = () => {
  const { getUser } = useContext(UserContext);
  const whiteColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  return (
    <Link href="auth/google">
      <Button
        type="button"
        onClick={getUser}
        borderRadius={10}
        variant="solid"
        colorScheme="purple"
      >
        Sign In With Google
      </Button>
    </Link>
  );
};

export default GoogleButton;

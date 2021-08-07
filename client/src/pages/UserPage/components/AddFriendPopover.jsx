import React from 'react';
import {
  Popover,
  Button,
  PopoverTrigger,
  Portal,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverContent,
  useDisclosure,
  useColorModeValue	
} from '@chakra-ui/react';

const AddFriendPopover = (props) => {
  const { userObj, addConspirator, userName } = props;
  const { onClose } = useDisclosure();
	const color = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')
  return (
    <Popover>
      <PopoverTrigger>
        <Button
	  colorscheme="blue"
          color={color}
	  variant="ghost"
	  >
          Add
          {' '}
          {userName}
          {' '}
          as Co-Conspirator
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            Really add
            {' '}
            {userName}
            {' '}
            as Co-Conspirator?
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (userObj.username) {
                  return addConspirator(userName);
                }
                onClose();
              }}
            >
              Add as Co-Conspirator

            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default AddFriendPopover;

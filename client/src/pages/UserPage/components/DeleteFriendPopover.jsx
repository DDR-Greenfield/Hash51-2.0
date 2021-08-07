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
} from '@chakra-ui/react';

const DeleteFriendPopover = (props) => {
  const { userObj, userName, updateConspirator, _id } = props;
  const { onClose } = useDisclosure();
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          fontSize="8px"
          colorScheme="red"
          borderTopRadius={0}
          type="delete"
          variant="ghost"
        >
          Remove
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            Really remove
            {' '}
            <b>{userName}</b>
            {' '}
            as Co-Conspirator?
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button
              colorScheme="red"
              onClick={() => {
                if (userObj.username) {
                  return updateConspirator(_id);
                }
                onClose();
              }}
            >
              Remove

            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default DeleteFriendPopover;

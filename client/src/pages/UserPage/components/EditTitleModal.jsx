import React, { useState, useContext } from 'react';
import { useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react';

import { DisplayContext } from '../../../contexts/DisplayContext';

const EditTitleModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { editStory } = useContext(DisplayContext);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  return (
    <>
      <Button
        variant="ghost"
        onClick={onOpen}
      >
        Edit

      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>New Title</FormLabel>
              <Input
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                value={newTitle}
                placeholder={props.userTitle}
              />
            </FormControl>
            <FormControl>
              <FormLabel>New Description</FormLabel>
              <Input
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                value={newDescription}
                placeholder={props.bodyText}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                editStory(props._id, newTitle, newDescription);
                onClose();
              }}
            >
              Save
            </Button>
            <Button onClick={() => {
              onClose();
            }}
            >
              Cancel

            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTitleModal;

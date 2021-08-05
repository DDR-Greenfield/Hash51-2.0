import React, {useContext, useState, useEffect} from 'react';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    Input,
    chakra,
    ModalCloseButton,
} from '@chakra-ui/react';

import io from 'socket.io-client';
import MessageList from './MessageList';
import { UserContext } from '../../../../contexts/UserContext';


const socket = io();



const Chat = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [msgInput, setMsgInput] = useState('');
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMsgs(msgs => [...msgs, message]);
    });

  }, []);

    const {userObj} = useContext(UserContext);

    const connectUser = () => {
      const userId = userObj.username;  // Retrieve userId
      if (!userId) return;
      socket.emit('userConnected', userId);
    };

  const disconnectUser = () =>{  // Called whenever a user signs out
    const userId = userObj.username;  // Retrieve userId
    if (!userId) return;
    socket.emit('userDisconnected', userId);
  };

  const sendMessage = (message) => {
    const userId = userObj.username;  // Retrieve userId
    if (!userId) return;
    socket.emit('message', message);
  };

  const handleSubmit = (event) => {
    const userID = userObj.username;  // Retrieve userId
    if (!userID) return;
    setMsgInput('');
     sendMessage({
       userId: userID,
       message: msgInput});
  };

return (
      <>
        <Button onClick={() => {
          connectUser();
            onOpen();}}>Chat</Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <chakra.div>
                <MessageList msgs={msgs}/>
                 </chakra.div>
                <chakra.div />
                <Input
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                onChange={(event) => {
                  setMsgInput(event.target.value);}}
                value={msgInput}
                placeholder="Message" />
            </ModalBody>
            <ModalFooter>
              <Button
              onClick={() => {
                handleSubmit();
              }}
              colorScheme="blue" mr={3}>
                Send
              </Button>
              <Button onClick={() => {
                disconnectUser();
                onClose();}}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
export default Chat;
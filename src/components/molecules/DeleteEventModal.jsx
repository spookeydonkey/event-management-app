import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDeleteEvent } from "../../utils/EventAPI";

const DeleteEventModal = ({ eventId, onEventDeleted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: deleteEvent, isLoading } = useDeleteEvent();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true); // Start showing spinner
    deleteEvent(eventId, {
      onSuccess: () => {
        setIsDeleting(false); // Stop showing spinner
        onEventDeleted();
        onClose();
      },
      onError: () => {
        setIsDeleting(false); // Stop showing spinner
      },
    });
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this event?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteEventModal;

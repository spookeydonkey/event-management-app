import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import EventForm from "../atoms/EventForm";

const AddEventModal = ({ refreshEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        label="Click to add a new event"
        aria-label="Add a new event"
        placement="bottom-start"
      >
        <Button bgColor={"rgb(147, 181, 198)"} onClick={onOpen}>
          Add Event
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"rgb(255, 227, 227)"} borderTopRadius={"md"}>
            Add an event
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventForm onClose={onClose} onEventAdded={refreshEvents} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEventModal;

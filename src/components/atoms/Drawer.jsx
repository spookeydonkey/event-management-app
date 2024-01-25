import { useRef, Suspense } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import Filter from "@components/molecules/Filter";
import AddEventModal from "@components/molecules/AddEventModal";

const DrawerComponent = ({ onEventAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        display={{ base: "block", md: "none" }}
      >
        Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Event Actions</DrawerHeader>
          <DrawerBody>
            <Box>
              <Filter />
              <Suspense
                fallback={
                  <Spinner
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                }
              >
                <AddEventModal onEventAdded={onEventAdded} />
              </Suspense>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;

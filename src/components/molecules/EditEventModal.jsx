import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useCategories, useUsers, useEditEvent } from "@utils/EventAPI";

const EditEventModal = ({ isOpen, onClose, event }) => {
  const { data: categories } = useCategories();
  const { data: users } = useUsers();
  const { mutate: editEvent } = useEditEvent();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    categoryId: "",
    createdBy: "",
    image: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.startTime ? event.startTime.split("T")[0] : "",
        startTime: event.startTime ? event.startTime.split("T")[1] : "",
        endTime: event.endTime ? event.endTime.split("T")[1] : "",
        location: event.location || "",
        categoryId: event.categoryIds?.[0] || "",
        createdBy: event.createdBy || "",
        image: event.image || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEventData = {
      title: formData.title,
      description: formData.description,
      startTime: `${formData.date}T${formData.startTime}`,
      endTime: `${formData.date}T${formData.endTime}`,
      location: formData.location,
      categoryIds: formData.categoryId ? [Number(formData.categoryId)] : [],
      createdBy: formData.createdBy ? Number(formData.createdBy) : undefined,
      image: formData.image,
    };

    editEvent({ eventId: event.id, updatedEvent: updatedEventData });
    onClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={"rgb(255, 227, 227)"} borderTopRadius={"md"}>
          Edit the event details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={1}>
          <FormControl mb={1}>
            <FormLabel>Event Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl mb={1}>
            <FormLabel>Event Description</FormLabel>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <Flex gap={1} direction={{ base: "column", md: "row" }}>
            <FormControl mb={1}>
              <FormLabel>Event Date</FormLabel>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl mb={1}>
              <FormLabel>Start Time</FormLabel>
              <Input
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl mb={1}>
              <FormLabel>End Time</FormLabel>
              <Input
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
          </Flex>

          <FormControl mb={1}>
            <FormLabel>Event Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl mb={1}>
            <FormLabel>Event Category</FormLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={1}>
            <FormLabel>Event Creator</FormLabel>
            <Select
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
            >
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={1}>
            <FormLabel>Event Image (URL)</FormLabel>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button bgColor={"rgb(255, 227, 227)"} mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEventModal;

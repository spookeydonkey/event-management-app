// EventForm.jsx
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useCategories, useUsers, useAddEvent } from "../../utils/EventAPI";

const EventForm = ({ onClose, onEventAdded }) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { mutate: addEvent, isLoading: isSubmitting } = useAddEvent(onClose);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [createdBy, setCreatedById] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      categoryId,
      createdBy,
      image,
    });
    setTimeout(() => {
      onEventAdded?.();
      onClose?.();
    }, 1500);
  };

  if (categoriesLoading || usersLoading) {
    return (
      <Spinner speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    );
  }

  return (
    <>
      <FormControl mb={1} isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Enter a title for your event"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl mb={1} isRequired>
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="Enter a description for your event"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Flex gap={1} direction={{ base: "column", md: "row" }}>
        <FormControl mb={1} isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            placeholder="Enter a date for your event"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <FormControl mb={1} isRequired>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormControl>
        <FormControl mb={1} isRequired>
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>
      </Flex>

      <FormControl mb={1} isRequired>
        <FormLabel>Location</FormLabel>
        <Input
          placeholder="Enter event location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormControl>
      <FormControl mb={1} isRequired>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select category"
          value={categoryId || ""}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
      </FormControl>
      <FormControl mb={1} isRequired>
        <FormLabel>Creator</FormLabel>
        <Select
          placeholder="Select user"
          value={createdBy || ""}
          onChange={(e) => setCreatedById(e.target.value)}
        >
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </Select>
      </FormControl>
      <FormControl mb={1}>
        <FormLabel>Event Image (URL)</FormLabel>
        <Input
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Button
          bgColor={"rgb(255, 227, 227)"}
          my={3}
          mr={3}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          Submit
        </Button>
        <Button colorScheme="gray" my={3} onClick={onClose}>
          Cancel
        </Button>
      </FormControl>
    </>
  );
};

export default EventForm;

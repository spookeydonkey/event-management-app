import { useState, Suspense, lazy, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Heading,
  Box,
  Text,
  Spinner,
  ButtonGroup,
  Button,
  AspectRatio,
  Flex,
  Stack,
  Grid,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { useFetchEventDetails, useCategories } from "@utils/EventAPI";
import EventCategories from "@components/atoms/EventCategories";
import { EventDate, EventTime } from "@components/atoms/EventDate";
import EventLocation from "@components/atoms/EventLocation";
import EventUser from "@components/atoms/EventUser";
import ErrorFallbackUI from "@components/atoms/ErrorFallbackUI";
import EventImage from "@components/atoms/EventImage";

const DeleteEventModal = lazy(() =>
  import("../components/molecules/DeleteEventModal")
);
const EditEventModal = lazy(() =>
  import("../components/molecules/EditEventModal")
);

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    data: event,
    isLoading,
    error,
    refetch,
  } = useFetchEventDetails(eventId);

  useEffect(() => {
    if (error?.isNotFound) {
      navigate("/404");
    }
  }, [error, navigate]);

  const queryClient = useQueryClient();
  const { categories } = useCategories();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => setIsEditModalOpen(true);
  const refreshEvents = () => queryClient.invalidateQueries(["events"]);

  const imageOptions = {
    minW: ["320px", "lg", "3xl"],
    // minH: ["200", "300"],
    // height: ["200", "300"],
  };

  if (isLoading)
    return (
      <Box p={10}>
        <Spinner
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  if (error || !event)
    return (
      <ErrorFallbackUI errorMessage="Error loading event." onRetry={refetch} />
    );

  const categoryLabel =
    event.categoryIds?.length > 1 ? "Categories" : "Category";

  return (
    <Stack as="main" p={2} gap={0}>
      {/* <AspectRatio ratio={16 / 9} maxW={1280}> */}
      <EventImage eventId={eventId} sizes={imageOptions} />
      {/* </AspectRatio> */}
      <Heading textAlign={"center"} pt={2} pb={4}>
        {event.title}
      </Heading>
      <SimpleGrid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={[1, 6]}
        w={"full"}
      >
        <Stack as="section" className="linker-kolom" minW={"50%"} p={2}>
          <Container pl={1}>
            <Text fontWeight={600}>{categoryLabel}:</Text>
            <EventCategories
              categoryIds={event.categoryIds}
              categories={categories}
            />
          </Container>
          <Container pl={1}>
            <Text fontWeight={600}>Description: </Text>
            <Text>{event.description}</Text>
          </Container>
          <Container pl={1}>
            <Text fontWeight={600}>Event Date and Time: </Text>
            <EventDate date={event.startTime} showIcon={false} />
            <EventTime
              startTime={event.startTime}
              endTime={event.endTime}
              showIcon={false}
            />
          </Container>
          <Container pl={1}>
            <Text fontWeight={600}>Location:</Text>
            <EventLocation location={event.location} showIcon={false} />
          </Container>
        </Stack>
        <Stack
          as="section"
          className="rechter-kolom"
          minW={"50%"}
          spacing={4}
          flexWrap="wrap"
          justifyContent={"space-between"}
          p={2}
        >
          <Container pl={2}>
            <Text fontWeight={600}>Event created by:</Text>
            <EventUser creatorId={event.createdBy} />
          </Container>
          <ButtonGroup flexWrap={"wrap"} gap={4} m={0}>
            <Text pl={2} w="100%" fontWeight={600}>
              Actions:
            </Text>
            <Button bg={"rgb(147, 181, 198)"} onClick={handleEditClick}>
              Edit Event
            </Button>
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
              <DeleteEventModal
                eventId={eventId}
                onEventDeleted={refreshEvents}
              />
              {isEditModalOpen && (
                <EditEventModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  event={event}
                />
              )}
            </Suspense>
          </ButtonGroup>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default EventDetailPage;

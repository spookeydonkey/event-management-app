import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Spinner,
  HStack,
  Box,
  Grid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useFetchEvents, useCategoryFilter, useSearch } from "@utils/EventAPI";
import EventCard from "@components/organisms/EventCard";
import Filter from "@components/molecules/Filter";
import ErrorFallbackUI from "@components/atoms/ErrorFallbackUI";

const EventDashboardPage = () => {
  const { data: events, isLoading, error, refetch } = useFetchEvents();
  const { categoryFilter } = useCategoryFilter();
  const { searchTerm } = useSearch();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const filteredAndSortedEvents = useMemo(() => {
    return (
      events
        ?.filter((event) => {
          const lowerCaseTitle = event.title?.toLowerCase() ?? "";
          const matchesTitle = lowerCaseTitle.includes(
            searchTerm.toLowerCase()
          );
          const matchesCategory =
            categoryFilter.length === 0 ||
            categoryFilter.some((filterId) =>
              event.categoryIds.includes(Number(filterId))
            );

          return matchesTitle && matchesCategory;
        })
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)) || []
    );
  }, [searchTerm, categoryFilter, events]);

  if (isLoading) {
    return <SpinnerBox />;
  }
  if (error) {
    return (
      <ErrorFallbackUI errorMessage="Error loading events." onRetry={refetch} />
    );
  }

  return (
    <Grid as="section" templateColumns={"auto 7fr"} justifyContent="center">
      {isLargerThan768 && <Filter />}
      <HStack
        className="rechter-kolom"
        spacing={4}
        flexWrap="wrap"
        width="full"
        justifyContent={"center"}
        p={2}
      >
        {filteredAndSortedEvents.length ? (
          filteredAndSortedEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))
        ) : (
          <NoEventsText />
        )}
      </HStack>
    </Grid>
  );
};

const SpinnerBox = () => (
  <Box p={10}>
    <Spinner speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Box>
);

const NoEventsText = () => <Text p={4}>No events match your criteria.</Text>;

export default EventDashboardPage;

// TODO: add an option to add events from EventBrite.

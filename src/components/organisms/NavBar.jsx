import React, { useState, Suspense, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Flex,
  Button,
  Stack,
  Spinner,
  CloseButton,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useSearch, useFetchEvents } from "@utils/EventAPI";
import SearchBar from "@components/molecules/SearchBar";
import Logo from "@components/atoms/Logo";
import Filter from "@components/molecules/Filter";
const AddEventModal = React.lazy(() =>
  import("@components/molecules/AddEventModal")
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { eventId } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { searchTerm, setSearchTerm } = useSearch();
  const { data: events } = useFetchEvents();

  const toggle = () => setIsOpen(!isOpen);
  const refreshEvents = () => queryClient.invalidateQueries(["events"]);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const pageTitle = useMemo(() => {
    if (location.pathname.includes("/event/")) {
      const eventDetail = events?.find((e) => e.id === eventId);
      return eventDetail?.title || "Event Details";
    }
    return "Event Dashboard";
  }, [location, events, eventId]);

  const upcomingEvent = useMemo(() => {
    if (!events) return null;
    const now = new Date();
    return events.reduce((closest, event) => {
      const eventDate = new Date(event.startTime);
      if (
        eventDate > now &&
        (!closest || eventDate < new Date(closest.startTime))
      ) {
        return event;
      }
      return closest;
    }, null);
  }, [events]);

  return (
    <NavBarContainer>
      <NavLink to="/">
        <Logo
          w="10rem"
          // color={["brand.500", "brand.500", "brand.700", "brand.700"]}
        />
      </NavLink>

      <Heading
        as="h1"
        size="lg"
        px={{ base: 0, md: 8 }}
        flexGrow={{ base: "1", md: "0" }}
        textAlign="center"
      >
        {pageTitle}
      </Heading>

      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks
        isOpen={isOpen}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        refreshEvents={refreshEvents}
        upcomingEvent={upcomingEvent}
      />
    </NavBarContainer>
  );
};

const MenuToggle = ({ toggle, isOpen }) => (
  <Box display={{ base: "block", md: "none" }} onClick={toggle}>
    {isOpen ? (
      <CloseButton size="md" />
    ) : (
      <IconButton
        aria-label="Menu"
        icon={<HamburgerIcon />}
        variant="outline"
      />
    )}
  </Box>
);

const MenuItem = ({ children, to }) => (
  <Button as={NavLink} to={to} bg={"rgb(147, 181, 198)"}>
    {children}
  </Button>
);

const MenuLinks = ({
  isOpen,
  searchTerm,
  handleSearchChange,
  refreshEvents,
  upcomingEvent,
}) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "center", "flex-end"]}
      direction={["column", "column", "row", "row"]}
      pt={[4, 4, 0, 0]}
      wrap={"wrap"}
      gap={2}
    >
      <MenuItem to="/">Event Dashboard</MenuItem>
      {upcomingEvent && (
        <MenuItem to={`/event/${upcomingEvent.id}`}>Upcoming Event</MenuItem>
      )}
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <Suspense fallback={<Spinner />}>
        <AddEventModal onEventAdded={refreshEvents} />
      </Suspense>
      <Box display={{ base: "block", md: "none" }}>
        <Filter />
      </Box>
    </Stack>
  </Box>
);

const NavBarContainer = ({ children }) => (
  <Flex
    as="nav"
    align="center"
    justify="center"
    wrap="wrap"
    width={"100%"}
    px={{ base: 4, md: 8 }}
    py={2}
    gap={1}
    bg="rgb(201, 204, 213)"
    boxShadow="md"
  >
    {children}
  </Flex>
);

export default NavBar;

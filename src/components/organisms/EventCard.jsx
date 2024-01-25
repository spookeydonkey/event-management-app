import {
  Card,
  CardBody,
  Heading,
  Text,
  CardHeader,
  Icon,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import EventCategories from "@components/atoms/EventCategories";
import { EventDate, EventTime } from "@components/atoms/EventDate";
import EventLocation from "@components/atoms/EventLocation";
import EventImage from "@components/atoms/EventImage";

const EventCard = ({
  event: { id, title, description, startTime, endTime, location, categoryIds },
  onBadgeClick,
  ...rest
}) => {
  const isPastEvent = new Date(startTime) < new Date();
  const pastEventStyling = {
    backgroundColor: "gray.200",
    color: "gray.500",
    filter: "grayscale(75%)",
  };

  return (
    <Card
      as="article"
      role="card"
      size={{ base: "md", sm: "xs" }}
      maxW={{ base: "xs", sm: "xs" }}
      minH={{ base: "xs", sm: "md" }}
      p={0}
      bg={isPastEvent ? pastEventStyling.backgroundColor : "rgb(201, 204, 213)"}
      style={{ filter: isPastEvent ? pastEventStyling.filter : "none" }}
      borderRadius={"md"}
    >
      <EventImage eventId={id} />
      <CardHeader
        p={2}
        color={isPastEvent ? pastEventStyling.color : "initial"}
      >
        <EventCategories
          categoryIds={categoryIds}
          onBadgeClick={onBadgeClick}
        />
        <Heading as="h2" size="lg">
          {title}
        </Heading>
      </CardHeader>
      <CardBody p={2} color={isPastEvent ? pastEventStyling.color : "initial"}>
        <Text>
          <Icon
            as={InfoOutlineIcon}
            mr={2}
            color={isPastEvent ? pastEventStyling.color : "initial"}
          />
          {description}
        </Text>
        <EventDate date={startTime} />
        <EventTime startTime={startTime} endTime={endTime} />
        <EventLocation location={location} />
      </CardBody>
    </Card>
  );
};

export default EventCard;

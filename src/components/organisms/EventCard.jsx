import {
  Card,
  CardBody,
  Heading,
  Text,
  CardHeader,
  Icon,
  Fade,
  CardFooter,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import EventCategories from "@components/atoms/EventCategories";
import { EventDate, EventTime } from "@components/atoms/EventDate";
import EventLocation from "@components/atoms/EventLocation";
import EventImage from "@components/atoms/EventImage";

const EventCard = ({
  event: { id, title, description, startTime, endTime, location, categoryIds },
  onBadgeClick,
}) => {
  const isPastEvent = new Date(startTime) < new Date();
  const pastEventStyles = {
    backgroundColor: "gray.200",
    color: "gray.500",
    filter: "grayscale(75%)",
  };

  return (
    <Fade in={true} style={{ transitionDuration: "0.5s" }}>
      <Card
        as="article"
        role="card"
        size={{ base: "md", sm: "xs" }}
        maxW={{ base: "xs", sm: "xs" }}
        minH={{ base: "xs", sm: "md" }}
        p={0}
        bg={
          isPastEvent ? pastEventStyles.backgroundColor : "rgb(201, 204, 213)"
        }
        style={{ filter: isPastEvent ? pastEventStyles.filter : "none" }}
        borderRadius={"md"}
      >
        <EventImage eventId={id} />
        <CardHeader
          p={2}
          color={isPastEvent ? pastEventStyles.color : "initial"}
        >
          <EventCategories
            categoryIds={categoryIds}
            onBadgeClick={onBadgeClick}
          />
          <Heading as="h2" size="lg">
            {title}
          </Heading>
        </CardHeader>
        <CardBody p={2} color={isPastEvent ? pastEventStyles.color : "initial"}>
          <Text
            maxH={"4rem"}
            overflowY={"auto"}
            sx={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <Icon
              as={InfoOutlineIcon}
              mr={2}
              color={isPastEvent ? pastEventStyles.color : "initial"}
            />
            {description}
          </Text>
        </CardBody>
        <CardFooter
          flexDirection={"column"}
          gap={1}
          p={2}
          color={isPastEvent ? pastEventStyles.color : "initial"}
        >
          <EventDate date={startTime} />
          <EventTime startTime={startTime} endTime={endTime} />
          <EventLocation location={location} />
        </CardFooter>
      </Card>
    </Fade>
  );
};

export default EventCard;

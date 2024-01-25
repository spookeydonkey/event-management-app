import { Box, Text, Icon } from "@chakra-ui/react";
import { TimeIcon, CalendarIcon } from "@chakra-ui/icons";

const formatDate = (dateString) => {
  if (!dateString) return "Date not specified or found";
  const date = new Date(dateString);
  return isNaN(date)
    ? "Invalid date"
    : `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
};

const formatTime = (timeString) => {
  if (!timeString) return "Time not specified or found";
  const date = new Date(timeString);
  return isNaN(date)
    ? "Invalid time"
    : date.toISOString().split("T")[1].slice(0, 5);
};

export const EventDate = ({ date, showIcon = true }) => (
  <Box>
    <Text>
      {showIcon && <Icon as={CalendarIcon} mr="2" />}
      {formatDate(date)}
    </Text>
  </Box>
);

export const EventTime = ({ startTime, endTime, showIcon = true }) => (
  <Box>
    <Text>
      {showIcon && <Icon as={TimeIcon} mr="2" />}
      {formatTime(startTime)} - {formatTime(endTime)}
    </Text>
  </Box>
);

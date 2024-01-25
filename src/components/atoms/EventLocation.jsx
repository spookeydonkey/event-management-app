import React from "react";
import { Text, Icon } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";

const EventLocation = ({ location, showIcon = true }) => {
  return (
    <Text>
      {showIcon && <Icon as={MdLocationOn} mr="2" />}
      {location}
    </Text>
  );
};

export default EventLocation;

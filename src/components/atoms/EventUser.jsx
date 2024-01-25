import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useUsers } from "../../utils/EventAPI";

const EventUser = ({ creatorId }) => {
  const { data: users } = useUsers();
  const user = users?.find((u) => u.id === creatorId);

  if (!user) {
    return (
      <Flex py={4} flexDirection={"row"} flexWrap={"wrap"} gap={4}>
        <Text fontWeight="bold">User not found</Text>
        <Avatar size="xl" src="" alt="Not Found" name="Not Found" />
      </Flex>
    );
  }

  return (
    <Flex py={4} flexDirection={"row"} flexWrap={"wrap"} gap={4}>
      <Text fontWeight="bold">{user.name}</Text>
      <Avatar size="xl" src={user.image} alt={user.name} name={user.name} />
    </Flex>
  );
};

export default EventUser;

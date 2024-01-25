import { Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      as="nav"
      bg="rgb(255, 227, 227)"
      p={4}
      justifyContent="center"
      gap="4"
    >
      <Button
        as={NavLink}
        to="/"
        _hover={{ bg: "rgb(147, 181, 198)", color: "brand.100" }}
        _activeLink={{
          textDecoration: "underline",
          color: "teal.500",
          bg: "rgb(201, 204, 213)",
        }}
      >
        Event Dashboard
      </Button>
      <Button
        as={NavLink}
        to="/event/1"
        _hover={{ bg: "rgb(147, 181, 198)", color: "brand.100" }}
        _activeLink={{
          textDecoration: "underline",
          color: "teal.500",

          bg: "rgb(201, 204, 213)",
        }}
      >
        Upcoming Event
      </Button>
    </Flex>
  );
};

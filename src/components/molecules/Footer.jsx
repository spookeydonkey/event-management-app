import { Text, Center, Link, Icon } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Center as="footer" bg="rgb(255, 227, 227)" p={4} flex={"auto"}>
      <Text fontSize="sm" color="gray.600">
        Code and © {currentYear} by{" "}
        <Link
          href="https://github.com/spookeydonkey"
          isExternal
          color="rgb(147, 181, 198)"
        >
          Ravi Rambaran
          <Icon as={FaGithub} mx={2} />
        </Link>
      </Text>
    </Center>
  );
};

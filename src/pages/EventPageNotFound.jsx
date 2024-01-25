import { Button, Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <Box bg="rgb(255, 227, 227)" textAlign="center" my={12}>
      <Heading mb={4}>404 - Page Not Found</Heading>
      <Text mb={8}>The page you are looking for does not exist.</Text>
      <Button bg={"rgb(147, 181, 198)"} onClick={handleReturnHome}>
        Return to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;

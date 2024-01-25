import { Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const ErrorFallbackUI = ({ errorMessage, onRetry }) => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" my={12}>
      <Text mb={4}>{errorMessage || "An error occurred."}</Text>
      <Button bg={"rgb(147, 181, 198)"} mr={3} onClick={onRetry}>
        Retry
      </Button>
      <Button bg={"rgb(147, 181, 198)"} onClick={() => navigate("/")}>
        Home
      </Button>
    </Box>
  );
};

ErrorFallbackUI.propTypes = {
  errorMessage: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorFallbackUI;

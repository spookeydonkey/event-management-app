import React from "react";
import {
  Heading,
  Text,
  Button,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  renderErrorDetails() {
    const { error, errorInfo } = this.state;
    const errorMessage = error?.toString() || "An error occurred.";

    return (
      <Alert status="error" flexDirection="column">
        <AlertIcon />
        <AlertTitle>Error (for the developer):</AlertTitle>
        <AlertDescription fontFamily="monospace">
          {errorMessage}
          {errorInfo && <div>{errorInfo.componentStack}</div>}
        </AlertDescription>
      </Alert>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center flexDirection="column" gap={2} p={4}>
          <Heading>Oops, something went wrong</Heading>
          <Text>Please try again later.</Text>
          {this.renderErrorDetails()}
          <Button colorScheme="teal" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

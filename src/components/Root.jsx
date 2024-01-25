// Root.jsx
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@components/molecules/Footer";
import { Box, Center } from "@chakra-ui/react";
import ErrorBoundary from "@utils/ErrorBoundary";
import NavBar from "@components/organisms/NavBar";

export const Root = () => {
  const location = useLocation();

  return (
    <ErrorBoundary location={location}>
      <Center
        bg="rgb(255, 227, 227)"
        minHeight="100vh"
        w={"100%"}
        flexDirection="column"
        // alignItems="center"
        // justifyContent="space-between"
        justifyContent={"flex-start"}
      >
        <NavBar as="header" />
        <Outlet />
        <Footer justifyContent="flex-end" />
      </Center>
    </ErrorBoundary>
  );
};

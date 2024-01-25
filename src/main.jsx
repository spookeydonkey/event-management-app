import { ChakraProvider, Spinner } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Root } from "./components/Root";
import {
  UserProvider,
  CategoryProvider,
  SearchProvider,
} from "@utils/EventAPI";
import ErrorBoundary from "@utils/ErrorBoundary";
import PageNotFound from "@pages/EventPageNotFound";
import { TransitionWrapper } from "@style/Transition";
import customTheme from "@style/Theme";

const EventDashboardPage = lazy(() => import("@pages/EventDashboardPage"));
const EventDetailPage = lazy(() => import("@pages/EventDetailPage"));

const rootElement = document.getElementById("root");
let root = rootElement._reactRootContainer;

if (!root) {
  root = ReactDOM.createRoot(rootElement);
}

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CategoryProvider>
          <ChakraProvider theme={customTheme}>
            <SearchProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Root />}>
                    <Route
                      index
                      element={
                        <ErrorBoundary>
                          <Suspense
                            fallback={
                              <Spinner
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                              />
                            }
                          >
                            <TransitionWrapper>
                              <EventDashboardPage />
                            </TransitionWrapper>
                          </Suspense>
                        </ErrorBoundary>
                      }
                    />
                    <Route
                      path="event/:eventId"
                      element={
                        <ErrorBoundary>
                          <Suspense
                            fallback={
                              <Spinner
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                              />
                            }
                          >
                            <TransitionWrapper>
                              <EventDetailPage />
                            </TransitionWrapper>
                          </Suspense>
                        </ErrorBoundary>
                      }
                    />
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Routes>
              </Router>
            </SearchProvider>
          </ChakraProvider>
        </CategoryProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

// Create context for users and categories
const UserContext = createContext();
const CategoryContext = createContext();
const SearchContext = createContext();

// Fetch data from API
const fetchData = async (url, setData, setError, setLoading) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Provider components
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(`${BASE_URL}/users`, setUsers, setError, setLoading);
  }, []);

  const value = { users, isLoading, error };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories from the API
    fetchData(`${BASE_URL}/categories`, setCategories, setError, setLoading);
  }, []);

  const value = {
    categories,
    isLoading,
    error,
    categoryFilter,
    setCategoryFilter,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

// Custom hooks to use the context
export const useUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch(`${BASE_URL}/users`).then((res) => res.json()),
  });

  return { data, isLoading, error };
};

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(`${BASE_URL}/categories`).then((res) => res.json()),
  });

  return { data, isLoading, error };
};

export const useCategoryFilter = () => {
  const { categoryFilter, setCategoryFilter } = useContext(CategoryContext);
  return { categoryFilter, setCategoryFilter };
};

// Fetch events using react-query
export const useFetchEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/events`);
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    },
  });
};

export const useFetchEventList = () => {
  return useQuery({
    queryKey: ["eventList"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/events`);
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    },
  });
};

export const useFetchEventDetails = (eventId) => {
  return useQuery({
    queryKey: ["eventDetails", eventId],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/events/${eventId}`);
      if (!response.ok) {
        const isNotFound = response.status === 404;
        const error = new Error(
          isNotFound ? "Event not found" : response.statusText
        );
        error.isNotFound = isNotFound;
        throw error;
      }
      return response.json();
    },
    retry: (failureCount, error) => {
      return !error.isNotFound && failureCount < 3;
    },
    retryDelay: 2000,
  });
};

export function useAddEvent() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (eventData) => {
      // Validate event data before sending
      if (!eventData.categoryId || !eventData.createdBy) {
        throw new Error("Please select a category and a creator.");
      }

      const response = await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...eventData,
          startTime: `${eventData.date}T${eventData.startTime}`,
          endTime: `${eventData.date}T${eventData.endTime}`,
          categoryIds: [Number(eventData.categoryId)],
          createdBy: Number(eventData.createdBy),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add event");
      }

      return response.json();
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["events"]);
      toast({
        title: "Event added successfully",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
      context?.onEventAdded?.();
      context?.onClose?.();
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error adding event",
        description: error.message || "An error occurred",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    },
  });

  return mutation;
}

export function useEditEvent() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ eventId, updatedEvent }) => {
      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit event");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Event edited successfully",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
      queryClient.invalidateQueries(["events"]);
    },
    onError: (error) => {
      toast({
        title: "Error editing event",
        description: error.message || "An error occurred",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    },
  });
}

export const useDeleteEvent = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (eventId) => {
      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      return response.json();
    },
    onSuccess: async () => {
      toast({
        title: "Event deleted.",
        description: "Event deleted successfully",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
      // Wait for the toast to be visible for a while before redirecting
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 1,5 seconds delay
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error deleting event",
        description: error.message || "An error occurred",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    },
  });

  return mutation;
};

// TODO: add a lastedited and dateadded field to the event model

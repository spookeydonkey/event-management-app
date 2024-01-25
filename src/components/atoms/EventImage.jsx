import { Image, Spinner } from "@chakra-ui/react";
import { useFetchEventDetails } from "../../utils/EventAPI";
import ErrorFallbackUI from "../atoms/ErrorFallbackUI";
import defaultEventImage from "../../assets/pexels-yogendra-singh.jpg";

const EventImage = ({ eventId, sizes }) => {
  const {
    data: event,
    isLoading,
    error,
    refetch,
  } = useFetchEventDetails(eventId);

  if (isLoading) return <Spinner label="Loading image..." />;
  if (error || !event)
    return (
      <ErrorFallbackUI
        errorMessage="Error loading image"
        onRetry={() => refetch()}
      />
    );

  const imageUrl = event?.image || defaultEventImage;
  const imageAlt = event?.title || "Event image";

  return (
    <>
      <Image
        src={imageUrl}
        alt={imageAlt}
        minW={sizes?.minW || "xs"}
        minH={sizes?.minH || ["150", "200"]}
        height={sizes?.height || ["150", "200"]}
        objectFit="cover"
        borderTopRadius={"lg"}
      />
    </>
  );
};

export default EventImage;

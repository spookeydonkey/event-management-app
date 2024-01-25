import { Fade } from "@chakra-ui/react";

export const TransitionWrapper = ({ children }) => {
  return <Fade in={true}>{children}</Fade>;
};

// TransitionWrapper.jsx
import { chakra, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = chakra(motion.div);

const pageTransition = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100%",
  },
};

export const TransitionWrapper = ({ children }) => {
  return (
    <MotionBox
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={{ duration: 0.5 }}
    >
      {children}
    </MotionBox>
  );
};

import { extendTheme } from "@chakra-ui/react";

const scrollStyles = {
  "html, body": {
    scrollBehavior: "smooth",
    "::-webkit-scrollbar": {
      width: ".5rem",
    },
    "::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0.1)",
    },
    "::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: ".1rem",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "rgba(0, 0, 0, 0.3)",
    },
  },
};

const customTheme = extendTheme({
  colors: {
    Relaxation: "rgb(255, 255, 255)",
    Sports: "rgb(255, 255, 255)",
    Games: "rgb(255, 255, 255)",
    brand: {
      100: "rgb(147, 181, 198)", // Buttons, badges, and clickables
      200: "rgb(201, 204, 213)", // Misc
      300: "rgb(228, 216, 220)", // Card bg
      400: "rgb(255, 227, 227)", // General bg
      500: "rgb(242, 209, 209)", // Secondary bg/misc 2
    },
  },
  components: {
    Button: {
      // baseStyle: {
      //   backgroundColor: "brand.100", // Use brand.100 color for buttons
      // },
    },
    Badge: {
      // baseStyle: {
      //   backgroundColor: "brand.100", // Use brand.100 color for badges
      // },
    },
    Card: {
      baseStyle: {
        backgroundColor: "brand.300", // Use brand.300 color for card backgrounds
      },
    },
    // Custom styles for Navigation
    Navigation: {
      baseStyle: {
        backgroundColor: "brand.500", // Use brand.500 color for navigation background
      },
    },
    // ... Add other components styling here
  },
  styles: {
    global: {
      // Apply the general background color to the body
      body: {
        bg: "brand.400",
      },
      ...scrollStyles,
    },
  },
});

export default customTheme;

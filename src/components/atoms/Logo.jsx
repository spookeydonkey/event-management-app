import { Box, Image } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box pt={[4, 4, 0, 0]} maxW={"3rem"} {...props}>
      <Image src="../../public/vite.svg" />
    </Box>
  );
}

import { Input } from "@chakra-ui/react";
import { useSearch } from "@utils/EventAPI";

const SearchBar = ({ value, onChange, placeholder, size, variant }) => (
  <Input
    size={size}
    variant={variant}
    width="auto"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

// Define default props
SearchBar.defaultProps = {
  placeholder: "Search for events",
  size: "md",
  variant: "filled",
};

export default SearchBar;

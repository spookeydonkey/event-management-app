import { Input } from "@chakra-ui/react";

const SearchBar = ({ value, onChange, placeholder, size, variant }) => (
  <Input
    size={size}
    variant={variant}
    width="auto"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    aria-label={placeholder}
  />
);

// Define default props
SearchBar.defaultProps = {
  placeholder: "Search for events",
  size: "md",
  variant: "filled",
};

export default SearchBar;

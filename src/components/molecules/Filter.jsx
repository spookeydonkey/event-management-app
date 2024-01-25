import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Card,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useCategories, useCategoryFilter } from "@utils/EventAPI";

const Filter = () => {
  const { categoryFilter, setCategoryFilter } = useCategoryFilter();
  const { data: categories } = useCategories();

  // Ensure categories are loaded
  if (!categories) return null;

  return (
    <Card p={3} m={2} minW={"15ch"} bg={"rgb(201, 204, 213)"}>
      <Text fontWeight="bold" py={3}>
        Filter by category:{" "}
      </Text>
      <CheckboxGroup value={categoryFilter} onChange={setCategoryFilter}>
        <Stack spacing={3} direction="column">
          {categories.map((category) => (
            <Checkbox
              colorScheme="teal"
              key={category.id}
              value={category.id.toString()}
            >
              <Badge bg={"rgb(147, 181, 198)"} color={"black"}>
                {category.name}
              </Badge>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Card>
  );
};

export default Filter;

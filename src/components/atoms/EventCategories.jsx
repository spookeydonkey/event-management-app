import { useMemo } from "react";
import { Badge, Wrap, WrapItem } from "@chakra-ui/react";
import { useCategories } from "@utils/EventAPI";

const EventCategories = ({ categoryIds = [] }) => {
  // Default value for categoryIds
  const { data: categories } = useCategories();
  const categoryColors = {
    relaxation: "purple",
    sports: "green",
    games: "orange",
    // Add more categories and their respective colors
  };

  const categoryMap = useMemo(() => {
    if (!Array.isArray(categories)) return new Map();
    return new Map(categories.map((cat) => [cat.id, cat]));
  }, [categories]);

  return (
    <Wrap>
      {(categoryIds || []).map((id) => {
        // Ensure categoryIds is always an array
        const category = categoryMap.get(id);
        if (!category) return null;

        const badgeColor = categoryColors[category.name] || "gray";

        return (
          <WrapItem key={id}>
            <Badge colorScheme={badgeColor}>{category.name}</Badge>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default EventCategories;

import { Text, View } from "react-native";
import { getProducts, getCategories } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log({ products, categories });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl text-blue-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}

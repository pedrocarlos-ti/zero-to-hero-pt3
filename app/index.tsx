import { Text, View } from "react-native";
import { getProducts, getCategories, Product } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import ProductCard from "@/components/ProductCard";

export default function Index() {
  const {
    data: products,
    isLoading,
    isRefetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  return (
    <View className="flex-1 bg-white">
      <FlashList
        data={products}
        renderItem={renderProduct}
        ListEmptyComponent={<Text>No products found</Text>}
        estimatedItemSize={200}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
}

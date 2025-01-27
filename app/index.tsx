import { ScrollView, Text, View } from "react-native";
import { getProducts, getCategories, Product } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";
import { useHeaderHeight } from "@react-navigation/elements";
export default function Index() {
  const headerHeight = useHeaderHeight();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  const filterCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = useMemo(
    () =>
      products?.filter(
        (product) =>
          selectedCategory === "All" || product.category === selectedCategory,
      ),
    [products, selectedCategory],
  );

  return (
    <View className="flex-1 bg-white p-2" style={{ paddingTop: headerHeight }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ gap: 12 }}
      >
        <Text className="text-2xl font-bold text-black">Categories</Text>
        <Categories
          categories={categories}
          onCategoryPress={filterCategory}
          selectedCategory={selectedCategory}
        />

        <Text className="text-2xl font-bold text-black">Products</Text>
        <FlashList
          data={filteredProducts}
          renderItem={renderProduct}
          ListEmptyComponent={<Text>No products found</Text>}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      </ScrollView>
    </View>
  );
}

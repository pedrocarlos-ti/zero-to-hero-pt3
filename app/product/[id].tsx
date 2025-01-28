import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/utils/api";
import { ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
const Page = () => {
  const { id } = useLocalSearchParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        <View className="aspect-square w-full p-4">
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
            transition={300}
          />
        </View>

        <View className="space-y-4 p-4">
          <Text className="text-2xl font-bold">{product.title}</Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </Text>
            <View className="flex-row items-center space-x-1">
              <AntDesign name="star" size={20} color="#FFD700" />
              <Text className="text-lg">
                {product.rating.rate} ({product.rating.count} reviews)
              </Text>
            </View>
          </View>

          <View className="py-2">
            <Text className="mb-2 text-lg font-semibold">Category</Text>
            <View className="self-start rounded-full bg-gray-100 px-4 py-2">
              <Text className="capitalize text-gray-800">
                {product.category}
              </Text>
            </View>
          </View>

          <View className="py-2">
            <Text className="mb-2 text-lg font-semibold">Description</Text>
            <Text className="leading-6 text-gray-600">
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        className="rounded-sm bg-blue-500 p-4 pb-10"
      >
        <Text className="text-center text-lg font-bold text-white">
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

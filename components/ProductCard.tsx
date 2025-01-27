import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Product } from "@/utils/api";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const PADDING = 16; // Equivalent to p-4 in Tailwind
  const CARD_WIDTH = width / 2 - 24; // Account for padding and gap
  const IMAGE_SIZE = CARD_WIDTH - PADDING * 2; // Subtract left and right padding

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.id}`)}
      className="m-2 gap-2 rounded-lg bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      activeOpacity={0.8}
      style={{ width: CARD_WIDTH }}
    >
      <Image
        source={{ uri: product.image }}
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          alignSelf: "center",
        }}
        contentFit="contain"
      />
      <Text numberOfLines={2} className="font-bold">
        {product.title}
      </Text>
      <Text className="text-gray-500">{product.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

import { Text, View } from "react-native";
import React from "react";
import { useCartStore } from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  return (
    <View className="flex-row items-center justify-center gap-2">
      <Ionicons name="basket-outline" size={22} color="gray" />
      <Text className="text-lg font-bold text-gray-500">{totalItems}</Text>
    </View>
  );
};

export default CartIcon;

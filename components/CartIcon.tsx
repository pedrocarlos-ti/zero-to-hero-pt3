import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useCartStore } from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CartIcon = () => {
  const router = useRouter();
  const { totalItems } = useCartStore();
  return (
    <TouchableOpacity
      onPress={() => router.push("/cart")}
      className="flex-row items-center justify-center gap-2"
    >
      <Ionicons name="basket-outline" size={22} color="gray" />
      <Text className="text-lg font-bold text-gray-500">{totalItems}</Text>
    </TouchableOpacity>
  );
};

export default CartIcon;

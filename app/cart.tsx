import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "@/store/cartStore";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function Cart() {
  const { products, removeProduct, clearCart, updateQuantity } = useCartStore();

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const animatedTotal = useSharedValue(1);
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
    animatedTotal.value = withSpring(1.2, {}, () => {
      animatedTotal.value = withSpring(1);
    });
  };

  if (products.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-xl font-semibold text-gray-600">
          Your cart is empty
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {products.map((product) => (
          <View
            key={product.id}
            className="flex-row border-b border-gray-200 p-4"
          >
            <Image
              source={{ uri: product.image }}
              style={{ width: 100, height: 100 }}
              contentFit="contain"
              transition={300}
              className="rounded-lg"
            />

            <View className="ml-4 flex-1 justify-between">
              <View>
                <Text className="text-lg font-semibold" numberOfLines={2}>
                  {product.title}
                </Text>
                <Text className="text-lg font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity
                    onPress={() => {
                      if (product.quantity > 1) {
                        handleUpdateQuantity(product.id, product.quantity - 1);
                      } else {
                        removeProduct(product.id);
                      }
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#4B5563"
                    />
                  </TouchableOpacity>

                  <Text className="text-lg font-semibold">
                    {product.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleUpdateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="#4B5563"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeProduct(product.id)}
                  className="rounded-full bg-red-100 p-2"
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="border-t border-gray-200 p-4 pb-10">
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-lg font-semibold">Total:</Text>
          <Animated.Text
            style={{ transform: [{ scale: animatedTotal }] }}
            className="text-2xl font-bold text-green-600"
          >
            ${total.toFixed(2)}
          </Animated.Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="rounded-lg bg-blue-500 p-4"
            activeOpacity={0.8}
          >
            <Text className="text-center text-lg font-bold text-white">
              Checkout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearCart}
            className="rounded-lg border border-gray-300 p-4"
            activeOpacity={0.8}
          >
            <Text className="text-center text-lg font-bold text-gray-700">
              Clear Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useCartStore } from "@/store/cartStore";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import { router } from "expo-router";

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

  const checkoutScale = useSharedValue(1);
  const checkoutOpacity = useSharedValue(1);

  const toastTranslateY = useSharedValue(100);
  const toastOpacity = useSharedValue(0);

  const showToast = () => {
    toastOpacity.value = 1;
    toastTranslateY.value = withSequence(
      withSpring(0),
      withTiming(0, { duration: 1000 }),
      withSpring(100, {}, (finished) => {
        if (finished) {
          runOnJS(resetToast)();
          runOnJS(router.back)();
        }
      }),
    );
  };

  const resetToast = () => {
    toastOpacity.value = 0;
    toastTranslateY.value = 100;
  };

  const handleCheckout = () => {
    checkoutScale.value = withSpring(0.8, {}, () => {
      checkoutOpacity.value = withSpring(0);
    });
    showToast();
    setTimeout(() => {
      checkoutScale.value = withSpring(1);
      checkoutOpacity.value = withSpring(1);
      clearCart();
    }, 1500);
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
      <Animated.ScrollView
        className="flex-1"
        style={{
          transform: [{ scale: checkoutScale }],
          opacity: checkoutOpacity,
        }}
      >
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
      </Animated.ScrollView>

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
            onPress={handleCheckout}
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

      <Animated.View
        style={{
          transform: [{ translateY: toastTranslateY }],
          opacity: toastOpacity,
        }}
        className="absolute bottom-20 left-4 right-4 rounded-lg bg-green-500 p-4 shadow-lg"
      >
        <Text className="text-center text-lg font-semibold text-white">
          Checkout Complete! 🎉
        </Text>
      </Animated.View>
    </View>
  );
}

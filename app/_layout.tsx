import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartIcon from "@/components/CartIcon";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/store/mmkv";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({ storage });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "~ MYSTORE ~",
            headerShadowVisible: false,
            headerRight: () => <CartIcon />,
            headerSearchBarOptions: {
              placeholder: "Search",
              hideWhenScrolling: true,
              hideNavigationBar: true,
            },
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Product Details",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="cart"
          options={{
            title: "Checkout",
            presentation: "modal",
            headerBackTitle: "Products",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

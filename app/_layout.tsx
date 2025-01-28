import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartIcon from "@/components/CartIcon";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

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
      </Stack>
    </QueryClientProvider>
  );
}

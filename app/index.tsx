import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl text-blue-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}

import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";

const Categories = ({
  categories,
  onCategoryPress,
  selectedCategory,
}: {
  categories: string[];
  onCategoryPress: (category: string) => void;
  selectedCategory: string | null;
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {["All", ...categories].map((category) => (
          <TouchableOpacity
            key={category}
            activeOpacity={0.8}
            className={`rounded-full px-6 py-3 ${
              selectedCategory === category
                ? "bg-blue-500"
                : "border border-gray-200 bg-gray-100"
            }`}
            onPress={() => onCategoryPress(category)}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedCategory === category ? "text-white" : "text-gray-700"
              }`}
              key={category}
            >
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

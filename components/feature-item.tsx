import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FeatureItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
}

export function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <View className="flex-row items-center space-x-4 py-2">
      <MaterialCommunityIcons name={icon} size={24} color="#4169E1" />
      <Text className="text-gray-700 text-base">{text}</Text>
    </View>
  );
}

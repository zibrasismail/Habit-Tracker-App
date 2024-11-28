import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    getUserEmail();
  }, []);

  async function getUserEmail() {
    const { data: { user } } = await supabase.auth.getUser();
    setUserEmail(user?.email ?? null);
  }

  const QuickAction = ({ icon, title, subtitle, onPress }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center p-4 bg-gray-100 rounded-xl mb-4"
    >
      <View className="bg-white p-3 rounded-lg mr-4">
        <Ionicons name={icon} size={24} color="#000" />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-lg">{title}</Text>
        <Text className="text-gray-600">{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Welcome Section */}
        <View className="mb-8">
          <Text className="text-2xl font-bold mb-2">Welcome Back!</Text>
          <Text className="text-gray-600">{userEmail}</Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4">Quick Actions</Text>
          <QuickAction
            icon="person"
            title="Update Profile"
            subtitle="Manage your personal information"
            onPress={() => {}}
          />
          <QuickAction
            icon="notifications"
            title="Notifications"
            subtitle="Check your latest updates"
            onPress={() => {}}
          />
          <QuickAction
            icon="settings"
            title="Preferences"
            subtitle="Customize your experience"
            onPress={() => {}}
          />
        </View>

        {/* Stats Section */}
        <View>
          <Text className="text-lg font-semibold mb-4">Your Activity</Text>
          <View className="flex-row justify-between">
            <View className="bg-gray-100 p-4 rounded-xl flex-1 mr-2">
              <Text className="text-2xl font-bold">0</Text>
              <Text className="text-gray-600">Posts</Text>
            </View>
            <View className="bg-gray-100 p-4 rounded-xl flex-1 ml-2">
              <Text className="text-2xl font-bold">0</Text>
              <Text className="text-gray-600">Likes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
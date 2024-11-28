import { FeatureItem } from "@/components/feature-item";
import { Logo } from "@/components/logo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import OnboardingCarousel from "./onboarding-carousel";
import { useState } from "react";

export default function WelcomeScreen() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleGetStarted = () => {
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    // Navigate to login screen
    router.replace('/login')
  }

  if (showOnboarding) {
    return <OnboardingCarousel onComplete={handleOnboardingComplete} />
  }
  return (
    <LinearGradient
      colors={["#F0F8FF", "#E0FFF0"]}
      className="flex-1 items-center px-6 pt-20 mt-4"
    >
      <View className="w-40 h-40 rounded-full bg-white shadow-lg items-center justify-center">
        <Image
          source={require("../../assets/images/logo-bg.png")}
          className="w-32 h-32 rounded-full"
          resizeMode="contain"
        />
      </View>


      <View className="items-center mt-6 space-y-2">
        <Text className="text-primary-blue text-3xl font-bold">
          HabitSphere
        </Text>
        <Text className="text-accent-green text-lg">Track. Grow. Succeed.</Text>
      </View>

      <TouchableOpacity
        className="bg-primary-blue px-8 py-3 rounded-full mt-8"
        activeOpacity={0.8}
        onPress={handleGetStarted}
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>

      <View className="mt-12 w-full flex-column items-center justify-between space-y-4">
        <FeatureItem
          icon="checkbox-marked-circle-outline"
          text="Daily Progress Tracking"
        />
        <FeatureItem icon="chart-line" text="Growth Analytics" />
        <FeatureItem icon="target" text="Goal Setting" />
      </View>
    </LinearGradient>
  );
}

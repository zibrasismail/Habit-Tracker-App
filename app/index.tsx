import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./(onboarding)/welcome";

export default function Home() {
  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <View className="flex-1 mt-4">
        <WelcomeScreen />
        </View>
    </SafeAreaProvider>
  );
}

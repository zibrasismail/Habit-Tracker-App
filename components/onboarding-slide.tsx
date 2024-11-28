import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface OnboardingSlideProps {
  title: string
  description: string
  icon: {
    name: keyof typeof MaterialCommunityIcons.glyphMap
    color: string
  }
}

export function OnboardingSlide({ title, description, icon }: OnboardingSlideProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-40 h-40 rounded-full bg-white/20 items-center justify-center mb-8">
        <MaterialCommunityIcons name={icon.name} size={48} color={icon.color} />
      </View>
      
      <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
        {title}
      </Text>
      
      <Text className="text-gray-600 text-center text-base">
        {description}
      </Text>
    </View>
  )
}


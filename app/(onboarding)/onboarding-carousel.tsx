import { useState } from 'react'
import { View, TouchableOpacity, Text, FlatList, useWindowDimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { OnboardingSlide } from '../../components/onboarding-slide'
import { PaginationDots } from '../../components/pagination-dots'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const slides: {
    id: string;
    title: string;
    description: string;
    icon: {
      name: keyof typeof MaterialCommunityIcons.glyphMap;
      color: string;
    };
  }[] = [
    {
      id: '1',
      title: 'Welcome to HabitSphere!',
      description: 'Track your habits, stay consistent, and achieve your goals every day.',
      icon: {
        name: 'check-circle-outline',
        color: '#20B2AA'
      }
    },
    {
      id: '2',
      title: 'Stay Motivated Together!',
      description: 'Invite friends, share achievements, and compete on leaderboards to stay inspired.',
      icon: {
        name: 'trophy',
        color: '#4169E1'
      }
    },
    {
      id: '3',
      title: 'Build Positive Habits!',
      description: 'Create custom habits, set goals, and track your progress effortlessly.',
      icon: {
        name: 'calendar-check',
        color: '#3CB371'
      }
    }
  ]

interface OnboardingCarouselProps {
  onComplete: () => void
}

export default function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { width } = useWindowDimensions()

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      onComplete()
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <LinearGradient
      colors={['#F0F8FF', '#E0FFF0']}
      className="flex-1"
    >
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardingSlide {...item} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width)
          setCurrentIndex(newIndex)
        }}
      />

      <View className="px-8 pb-12">
        <PaginationDots total={slides.length} current={currentIndex} />
        
        <View className="mt-6 flex-row justify-between">
          {currentIndex > 0 ? (
            <TouchableOpacity
              onPress={() => setCurrentIndex(currentIndex - 1)}
              className="px-6 py-3"
            >
              <Text className="text-gray-600 text-base">Back</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSkip}
              className="px-6 py-3"
            >
              <Text className="text-gray-600 text-base">Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleNext}
            className={`px-8 py-3 rounded-full ${
              currentIndex === slides.length - 1
                ? 'bg-accent-green'
                : 'bg-primary-blue'
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}
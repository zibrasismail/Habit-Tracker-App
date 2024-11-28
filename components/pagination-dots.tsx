import { View } from 'react-native'

interface PaginationDotsProps {
  total: number
  current: number
}

export function PaginationDots({ total, current }: PaginationDotsProps) {
  return (
    <View className="flex-row space-x-2">
      {[...Array(total)].map((_, index) => (
        <View
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === current 
              ? 'bg-primary-blue w-4' 
              : 'bg-gray-300'
          }`}
        />
      ))}
    </View>
  )
}


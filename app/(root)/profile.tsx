import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    username: '',
    bio: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setProfile(prev => ({
        ...prev,
        email: user.email || '',
      }));
    }
  }

  async function handleUpdateProfile() {
    // TODO: Implement profile update logic
    setIsEditing(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-black p-2 rounded-full"
              onPress={() => {}}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          <View className="mt-4 items-center">
            <Text className="text-2xl font-bold">{profile.fullName || 'Add Name'}</Text>
            <Text className="text-gray-600">@{profile.username || 'username'}</Text>
          </View>
        </View>

        {/* Profile Info */}
        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Profile Information</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Text className="text-blue-500">
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-600 mb-1">Email</Text>
              <Text className="text-black">{profile.email}</Text>
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Full Name</Text>
              {isEditing ? (
                <TextInput
                  value={profile.fullName}
                  onChangeText={(text) => setProfile(prev => ({ ...prev, fullName: text }))}
                  className="bg-white p-2 rounded-lg border border-gray-200"
                />
              ) : (
                <Text className="text-black">{profile.fullName || 'Not set'}</Text>
              )}
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Username</Text>
              {isEditing ? (
                <TextInput
                  value={profile.username}
                  onChangeText={(text) => setProfile(prev => ({ ...prev, username: text }))}
                  className="bg-white p-2 rounded-lg border border-gray-200"
                />
              ) : (
                <Text className="text-black">{profile.username || 'Not set'}</Text>
              )}
            </View>

            <View>
              <Text className="text-gray-600 mb-1">Bio</Text>
              {isEditing ? (
                <TextInput
                  value={profile.bio}
                  onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
                  multiline
                  numberOfLines={3}
                  className="bg-white p-2 rounded-lg border border-gray-200"
                />
              ) : (
                <Text className="text-black">{profile.bio || 'No bio yet'}</Text>
              )}
            </View>

            {isEditing && (
              <TouchableOpacity
                onPress={handleUpdateProfile}
                className="bg-black py-3 rounded-lg items-center mt-4"
              >
                <Text className="text-white font-semibold">Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
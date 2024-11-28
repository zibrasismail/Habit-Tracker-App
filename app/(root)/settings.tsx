import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle,
    onPress,
    showToggle,
    toggleValue,
    onToggle
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3"
    >
      <View className="bg-gray-200 p-2 rounded-lg mr-4">
        <Ionicons name={icon} size={22} color="#000" />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-base">{title}</Text>
        {subtitle && <Text className="text-gray-600 text-sm">{subtitle}</Text>}
      </View>
      {showToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#000' }}
          thumbColor={toggleValue ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/login');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Settings</Text>

        {/* Account Settings */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">Account</Text>
          <SettingItem
            icon="person"
            title="Account Information"
            subtitle="Manage your account details"
          />
          <SettingItem
            icon="lock-closed"
            title="Security"
            subtitle="Password and authentication"
          />
          <SettingItem
            icon="notifications"
            title="Notifications"
            showToggle
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
        </View>

        {/* Preferences */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">Preferences</Text>
          <SettingItem
            icon="moon"
            title="Dark Mode"
            showToggle
            toggleValue={darkMode}
            onToggle={setDarkMode}
          />
          <SettingItem
            icon="mail"
            title="Email Updates"
            showToggle
            toggleValue={emailUpdates}
            onToggle={setEmailUpdates}
          />
        </View>

        {/* Support */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">Support</Text>
          <SettingItem
            icon="help-circle"
            title="Help Center"
            subtitle="Get help with your account"
          />
          <SettingItem
            icon="document-text"
            title="Terms of Service"
          />
          <SettingItem
            icon="shield"
            title="Privacy Policy"
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 py-4 rounded-xl items-center mt-4"
        >
          <Text className="text-white font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
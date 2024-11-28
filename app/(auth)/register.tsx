import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // After successful signup, navigate to login
      router.replace('/login');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-center mb-8">Create Account</Text>
        
        <View className="space-y-4">
          <TextInput
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error && (
            <Text className="text-red-500 text-sm">{error}</Text>
          )}

          <TouchableOpacity 
            className={`w-full h-12 rounded-lg flex items-center justify-center ${
              loading ? 'bg-gray-400' : 'bg-black'
            }`}
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-base">
              {loading ? 'Loading...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/login')}
            className="mt-4"
          >
            <Text className="text-black text-center text-sm">
              Already have an account? 
              <Text className="font-semibold"> Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
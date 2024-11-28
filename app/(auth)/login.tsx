import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWithEmail() {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      router.replace('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-center mb-8">Welcome Back</Text>
        
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

          {error && (
            <Text className="text-red-500 text-sm">{error}</Text>
          )}

          <TouchableOpacity 
            className={`w-full h-12 rounded-lg flex items-center justify-center ${
              loading ? 'bg-gray-400' : 'bg-black'
            }`}
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-base">
              {loading ? 'Loading...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/register')}
            className="mt-4"
          >
            <Text className="text-black text-center text-sm">
              Don't have an account? 
              <Text className="font-semibold"> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
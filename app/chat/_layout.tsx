import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function ChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.dark.background,
        },
        headerTintColor: '#FFFFFF',
        headerShadowVisible: false,
      }}
    />
  );
} 
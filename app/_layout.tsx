import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/screens/LoginScreen';
import { PaperProvider } from 'react-native-paper';

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].text,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider
      theme={{
        colors: {
          primary: '#CCFF00',
          onPrimary: '#000000',
          primaryContainer: '#CCFF00',
          onPrimaryContainer: '#000000',
          secondary: '#CCFF00',
          onSecondary: '#000000',
          secondaryContainer: '#CCFF00',
          onSecondaryContainer: '#000000',
          tertiary: '#CCFF00',
          onTertiary: '#000000',
          tertiaryContainer: '#CCFF00',
          onTertiaryContainer: '#000000',
          error: '#FF0000',
          onError: '#FFFFFF',
          errorContainer: '#FF0000',
          onErrorContainer: '#FFFFFF',
          background: Colors.dark.background,
          onBackground: '#FFFFFF',
          surface: Colors.dark.background,
          onSurface: '#FFFFFF',
          surfaceVariant: '#1E1E1E',
          onSurfaceVariant: '#FFFFFF',
          outline: '#CCFF00',
          outlineVariant: '#CCFF00',
          shadow: '#000000',
          scrim: '#000000',
          inverseSurface: '#FFFFFF',
          inverseOnSurface: '#000000',
          inversePrimary: '#000000',
          elevation: {
            level0: 'transparent',
            level1: '#1E1E1E',
            level2: '#1E1E1E',
            level3: '#1E1E1E',
            level4: '#1E1E1E',
            level5: '#1E1E1E',
          },
        },
        dark: true,
      }}
    >
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </PaperProvider>
  );
}

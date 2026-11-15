import { useColorScheme } from '@/components/useColorScheme';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <FavoritesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="event/[id]"
            options={{ title: 'Event Details' }}
          />
        </Stack>
      </ThemeProvider>
    </FavoritesProvider>
  );
}
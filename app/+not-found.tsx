import { Stack, useRouter } from 'expo-router';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useThemeStore } from '@/stores/useTheme';

const notFoundImage = require('@/assets/images/not_found.png');

export default function NotFoundScreen() {
  const { colors } = useThemeStore();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image
          source={notFoundImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text
          variant="titleLarge"
          style={[styles.text, { color: colors.text, fontFamily: 'SpaceMono' }]}
        >
          Page Not Found
        </Text>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={{ color: colors.white }}
          onPress={() => router.push('/(tabs)/explore')}
        >
          Go Back Home
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: 250,
    marginBottom: 30,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 4,
  },
});

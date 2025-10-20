import { PropsWithChildren } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useThemeStore } from '@/stores/useTheme';

interface GlassCardProps {
  intensity?: number;
  style?: StyleProp<ViewStyle>;
  tint?: 'light' | 'dark' | 'default';
  borderless?: boolean;
}

export default function GlassCard({
  children,
  intensity = 40,
  style,
  tint = 'default',
  borderless = false,
}: PropsWithChildren<GlassCardProps>) {
  const { colors, theme } = useThemeStore();

  const Wrapper = theme === 'light' ? BlurView : View;

  return (
    <Wrapper
      intensity={Wrapper === BlurView ? intensity : undefined}
      tint={Wrapper === BlurView ? tint : undefined}
      style={[
        styles.glass,
        {
          backgroundColor:
            Wrapper === BlurView
              ? undefined
              : theme === 'light'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(18,18,18,0.7)',
          borderColor: borderless
            ? 'transparent'
            : theme === 'light'
              ? 'rgba(255,255,255,0.55)'
              : colors.outline,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            backgroundColor:
              theme === 'light'
                ? 'rgba(255,255,255,0.35)'
                : 'rgba(255,255,255,0.03)',
          },
        ]}
      >
        {children}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inner: {
    padding: 20,
  },
});

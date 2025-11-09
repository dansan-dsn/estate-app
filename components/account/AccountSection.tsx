import { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface AccountSectionProps extends PropsWithChildren {
  title: string;
  description?: string;
  colors: any;
}

export function AccountSection({
  title,
  description,
  colors,
  children,
}: AccountSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {description}
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

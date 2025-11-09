import { Alert, View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

import GlassCard from '@/components/ui/GlassCard';
import { UserProfile } from '@/shared/interfaces/user';

interface ShortcutChipsProps {
  shortcuts: NonNullable<UserProfile['quickLinks']>;
  colors: any;
}

export function ShortcutChips({ shortcuts, colors }: ShortcutChipsProps) {
  if (!shortcuts.length) {
    return null;
  }

  return (
    <GlassCard>
      <View style={styles.quickLinks}>
        {shortcuts.map((link) => (
          <Chip
            key={link.label}
            icon={link.icon as any}
            style={[styles.quickLinkChip, { backgroundColor: colors.surfaceVariant }]}
            textStyle={{ color: colors.text }}
            onPress={() =>
              Alert.alert('Navigation', `${link.label} opens once APIs are connected.`)
            }
          >
            {link.label}
          </Chip>
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickLinkChip: {
    borderRadius: 20,
  },
});

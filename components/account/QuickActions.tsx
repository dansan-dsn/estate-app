import { Alert, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import GlassCard from '@/components/ui/GlassCard';

export type QuickActionIntent = 'primary' | 'secondary' | 'info';

export interface QuickAction {
  label: string;
  icon: string;
  mode: 'contained' | 'outlined' | 'contained-tonal';
  intent: QuickActionIntent;
}

interface QuickActionsProps {
  actions: QuickAction[];
  colors: any;
  onActionPress?: (action: QuickAction) => void;
  onEditProfile: () => void;
  onLogout: () => void;
}

export function QuickActionsPanel({
  actions,
  colors,
  onActionPress,
  onEditProfile,
  onLogout,
}: QuickActionsProps) {
  const handleAction = (action: QuickAction) => {
    if (onActionPress) {
      onActionPress(action);
      return;
    }
    Alert.alert('Coming soon', `${action.label} will be available once services are connected.`);
  };

  const intentTone = (intent: QuickActionIntent) => {
    switch (intent) {
      case 'info':
        return colors.info;
      case 'secondary':
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  return (
    <GlassCard>
      {actions.map((action) => {
        const tone = intentTone(action.intent);
        return (
          <Button
            key={action.label}
            mode={action.mode}
            icon={action.icon as any}
            style={[
              styles.actionButton,
              action.mode === 'contained' ? { backgroundColor: tone } : { borderColor: tone },
            ]}
            textColor={action.mode === 'contained' ? colors.white : tone}
            onPress={() => handleAction(action)}
          >
            {action.label}
          </Button>
        );
      })}

      <View style={styles.actionFooter}>
        <Button
          mode="outlined"
          icon="account-edit"
          onPress={onEditProfile}
          style={[styles.actionButton, { borderColor: colors.textSecondary }]}
          textColor={colors.textSecondary}
        >
          Edit profile
        </Button>
        <Button mode="text" icon="logout" onPress={onLogout} textColor={colors.error}>
          Sign out
        </Button>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginBottom: 10,
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    gap: 12,
    flexWrap: 'wrap',
  },
});
